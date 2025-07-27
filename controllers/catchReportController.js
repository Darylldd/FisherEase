const CatchReport = require('../models/catchReportModel');
const auditController = require('./auditController');
const mlUtils = require('../utils/mlUtils');
const { validationResult } = require('express-validator');
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

exports.getStockClusters = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).send("Unauthorized");

    const reports = await CatchReport.getReportsWithLocation(userId);
    console.log('Fetched reports:', JSON.stringify(reports, null, 2));

    let clusters = [];
    if (reports.length < 1) {
      console.log('No reports, using fallback cluster');
      clusters = [{
        number: 0,
        center: { lat: 14.5833, lng: 120.9667 },
        averageQuantity: 0,
        points: [],
        indices: reports.map((_, i) => i) // Link all reports to fallback
      }];
    } else {
      const data = mlUtils.prepareDataForClustering(reports);
      clusters = mlUtils.performKMeansClustering(data);
    }

    console.log('Clusters before saving:', JSON.stringify(clusters, null, 2));
    await CatchReport.clearClustersByUser(userId);

    if (clusters.length === 0) {
      console.log('No clusters generated, saving fallback cluster');
      clusters = [{
        number: 0,
        center: { lat: 14.5833, lng: 120.9667 },
        averageQuantity: reports.reduce((sum, r) => sum + parseFloat(r.quantity), 0) / reports.length || 0,
        points: reports.map(r => [14.5833, 120.9667, parseFloat(r.quantity)]),
        indices: reports.map((_, i) => i)
      }];
    }

    for (const cluster of clusters) {
      if (
        isNaN(cluster.center.lat) || isNaN(cluster.center.lng) ||
        cluster.center.lat < -90 || cluster.center.lat > 90 ||
        cluster.center.lng < -180 || cluster.center.lng > 180
      ) {
        console.error('Invalid cluster coordinates:', JSON.stringify(cluster, null, 2));
        continue;
      }
      const clusterId = await CatchReport.insertCluster(
        userId,
        cluster.number,
        cluster.center.lat,
        cluster.center.lng,
        parseFloat(cluster.averageQuantity) || 0
      );

      if (cluster.indices && cluster.indices.length > 0) {
        for (const idx of cluster.indices) {
          if (reports[idx] && reports[idx].id) {
            await CatchReport.linkReportToCluster(reports[idx].id, clusterId);
          } else {
            console.warn(`Invalid report index ${idx} for cluster ${cluster.number}`);
          }
        }
      }
    }

    const savedClusters = await CatchReport.getClustersByUser(userId);
    const clustersWithReports = await Promise.all(
      savedClusters.map(async cluster => {
        const reports = await CatchReport.getReportsForCluster(cluster.cluster_id);
        return {
          ...cluster,
          average_quantity: parseFloat(cluster.average_quantity) || 0,
          reports: reports.slice(0, 5)
        };
      })
    );

    console.log('Clusters to render:', JSON.stringify(clustersWithReports, null, 2));
    res.render('stockClusters', { 
      clusters: clustersWithReports,
      error: clustersWithReports.length === 1 && clustersWithReports[0].average_quantity === 0 
        ? 'No valid reports found, showing fallback cluster' 
        : null,
      user: req.session.user || { name: "Guest" },
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN || 'your_mapbox_token'
    });
  } catch (error) {
    console.error('Clustering Error:', {
      message: error.message,
      stack: error.stack,
      userId: req.session.userId
    });
    const fallbackCluster = [{
      cluster_id: 0,
      cluster_number: 0,
      center_latitude: 14.5833,
      center_longitude: 120.9667,
      average_quantity: 0,
      report_count: 0,
      species_list: null,
      reports: []
    }];
    const clusterId = await CatchReport.insertCluster(
      userId,
      0,
      14.5833,
      120.9667,
      0
    );
    if (reports && reports.length > 0) {
      for (const report of reports) {
        await CatchReport.linkReportToCluster(report.id, clusterId);
      }
    }
    console.log('Saved fallback cluster:', clusterId);
    res.status(500).render('stockClusters', { 
      clusters: fallbackCluster,
      error: 'Error generating clusters. Showing fallback cluster.',
      user: req.session.user || { name: "Guest" },
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN || 'your_mapbox_token'
    });
  }
};

exports.submitCatchReport = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).send("User is not authenticated");
    }

    const userId = req.session.userId;
    const { species, quantity, location, method_of_fishing, date } = req.body;

    if (!species || !quantity || !location || !date) {
      return res.status(400).send("All fields are required");
    }

    await CatchReport.createReport(userId, species, quantity, location, method_of_fishing, "Under Review", date);

    await auditController.logUserActivity(req, "Submitted a catch report");

    res.status(200).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error("Error submitting catch report:", error);
    res.status(500).send("Internal server error");
  }
};

exports.syncOfflineReports = async (req, res) => {
  try {
    const reports = JSON.parse(localStorage.getItem('offlineReports')) || [];
    for (const report of reports) {
      await CatchReport.createReport(req.session.userId, report.species, report.quantity, report.location, report.method_of_fishing, "Under Review", report.date);
    }
    localStorage.removeItem('offlineReports');
    res.status(200).send("Offline reports synced successfully.");
  } catch (error) {
    console.error("Error syncing offline reports:", error);
    res.status(500).send("Error syncing reports.");
  }
};

exports.getUserReports = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).send("User not authenticated");
    }

    const userId = req.session.userId;
    const reports = await CatchReport.getReportsByUser(userId);

    res.render('catch-report', { reports, user: req.session.user || { name: "Guest" } });
  } catch (error) {
    console.error("Error fetching user reports:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllReportsForAdmin = async (req, res) => {
  try {
    console.log("Session:", req.session); // Debug session
    const userId = req.session.userId;
    const userRole = req.session.role;
    if (!userId || !userRole || userRole !== "admin") {
      console.log("Access denied: Invalid session or non-admin role");
      return res.redirect("/auth/login"); // Redirect to login
    }

    const filters = {
      species: req.query.species || '',
      location: req.query.location || '',
      status: req.query.status || '',
      date: req.query.date || '',
      month: req.query.month || '',
      year: req.query.year || '',
      sortBy: req.query.sortBy || ''
    };

    const reports = await CatchReport.getAllReports(filters);
    console.log("Reports fetched:", reports.length);

    res.render('catchReportReview', { 
      reports, 
      filters, 
      user: req.session.user || { name: "Guest" } // Fallback for user
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).send('Server Error');
  }
};

exports.approveReport = async (req, res) => {
  try {
    console.log("Approving report ID:", req.params.id);

    const reportId = req.params.id;
    if (!reportId) {
      return res.status(400).json({ success: false, message: "Report ID is required" });
    }

    const result = await CatchReport.updateReportStatus(reportId, 'Approved');

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    
    res.json({ success: true, message: "Report approved" });
  } catch (error) {
    console.error("Error approving report:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.flagReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    if (!reportId) {
      return res.status(400).json({ success: false, message: "Report ID is required" });
    }

    const result = await CatchReport.updateReportStatus(reportId, 'Flagged');

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.json({ success: true, message: 'Report flagged' });
  } catch (error) {
    console.error('Error flagging report:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.generateReport = async (req, res) => {
  try {
    const { startDate, endDate, species, location, month, year } = req.query;

    const filters = {
      startDate,
      endDate,
      species: species || "",
      location: location || "",
      month: month || "",
      year: year || ""
    };

    const reports = await CatchReport.getFilteredReports(filters);

    res.render("adminReport", { 
      reports, 
      speciesList: [], 
      locationList: [], 
      reportGenerated: true,
      user: req.session.user || { name: "Guest" }
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const filters = {
      species: req.query.species || '',
      location: req.query.location || '',
      status: req.query.status || '',
      month: req.query.month || '',
      year: req.query.year || ''
    };

    console.log('Received filters for PDF export:', filters);

    if (filters.month && !filters.year) {
      return res.status(400).send("Year is required when filtering by month.");
    }
    if (filters.year && !filters.month) {
      return res.status(400).send("Month is required when filtering by year.");
    }

    const reports = await CatchReport.getAllReports(filters);
    console.log(`Fetched ${reports.length} reports for PDF:`, reports.map(r => ({
      id: r.id,
      date: r.date,
      user_name: r.user_name,
      species: r.species
    })));

    if (!reports || reports.length === 0) {
      return res.status(404).send("No reports found for the specified filters.");
    }

    const pdfDoc = new PDFDocument({ size: 'A4', margin: 40 });
    const filename = `catch_report${filters.month && filters.year ? `_${filters.month}_${filters.year}` : ''}.pdf`;

    // Send PDF directly to response
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);

    let title = 'Catch Report';
    if (filters.month && filters.year) {
      title += ` - ${filters.month}/${filters.year}`;
    }
    pdfDoc.fontSize(18).text(title, { align: 'center' });
    pdfDoc.moveDown();

    reports.forEach((report, index) => {
      const reportDate = report.date ? new Date(report.date).toISOString().split('T')[0] : 'N/A';
      pdfDoc.fontSize(12).text(
        `${index + 1}. User: ${report.user_name || 'N/A'}, ` +
        `Species: ${report.species || 'N/A'}, ` +
        `Quantity: ${report.quantity || 'N/A'}, ` +
        `Location: ${report.location || 'N/A'}, ` +
        `Method: ${report.method_of_fishing || 'N/A'}, ` +
        `Status: ${report.status || 'N/A'}, ` +
        `Date: ${reportDate}`
      );
      pdfDoc.moveDown();
    });

    pdfDoc.end();

  } catch (error) {
    console.error('Error in downloadReport:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};

exports.downloadExcelReport = async (req, res) => {
  try {
    const filters = {
      species: req.query.species || '',
      location: req.query.location || '',
      status: req.query.status || '',
      month: req.query.month || '',
      year: req.query.year || ''
    };

    const reports = await CatchReport.getAllReports(filters);

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["User", "Species", "Methods Of Fishing", "Quantity", "Location", "Status", "Date"],
      ...reports.map(report => [
        report.user_name,
        report.species,
        report.method_of_fishing,
        report.quantity,
        report.location,
        report.status,
        new Date(report.date).toISOString().split('T')[0]
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Catch Report Review");

    // Write to buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    const filename = `catch_report${filters.month && filters.year ? `_${filters.month}_${filters.year}` : ''}.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error("Error downloading Excel report:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getReportFilters = async (req, res) => {
  try {
    const speciesList = await CatchReport.getDistinctSpecies();
    const locationList = await CatchReport.getDistinctLocations();
    const user = req.session.user || { name: "Guest" };
    const filters = {
      startDate: req.query.startDate || '',
      endDate: req.query.endDate || '',
      species: req.query.species || '',
      location: req.query.location || '',
      month: req.query.month || '',
      year: req.query.year || ''
    };
    const reports = await CatchReport.getFilteredReports(filters);
    const reportGenerated = reports.length > 0;

    res.render("adminReport", { 
      speciesList, 
      locationList, 
      reportGenerated,
      user,
      filters
    });
  } catch (error) {
    console.error("Error fetching report filters:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.exportUserReportPDF = async (req, res) => {
  try {
    const userId = req.session.userId;
    let { month, year } = req.query;

    if (!userId) return res.status(401).send("Unauthorized");

    // Use current month/year as fallback if not provided
    const currentDate = new Date();
    month = month || (currentDate.getMonth() + 1).toString(); // Months are 0-based in JS
    year = year || currentDate.getFullYear().toString();

    const reports = await CatchReport.getReportsByUserFiltered({ userId, month, year });

    const pdfDoc = new PDFDocument({ size: "A4", margin: 40 });

    // Set headers for direct download
    const filename = `catch_report_user_${userId}_${month}_${year}.pdf`;
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/pdf");

    // Pipe directly to response
    pdfDoc.pipe(res);

    // PDF content with validated month/year
    const reportTitle = month && year ? `${month}/${year}` : "All Time";
    pdfDoc.fontSize(18).text(`Catch Report for ${reportTitle}`, { align: "center" });
    pdfDoc.moveDown();

    if (reports.length === 0) {
      pdfDoc.fontSize(12).text("No records found for this period.");
    } else {
      reports.forEach((report, index) => {
        // Ensure no undefined/null values
        const species = report.species ?? "N/A";
        const quantity = report.quantity ?? "N/A";
        const location = report.location ?? "N/A";
        const method = report.method_of_fishing ?? "N/A";
        const status = report.status ?? "N/A";
        const date = report.date ? new Date(report.date).toISOString().split("T")[0] : "N/A";

        pdfDoc
          .fontSize(12)
          .text(
            `${index + 1}. Species: ${species}, Qty: ${quantity}, Location: ${location}, Method: ${method}, Status: ${status}, Date: ${date}`
          );
        pdfDoc.moveDown();
      });
    }

    pdfDoc.end(); // Finish PDF stream
  } catch (err) {
    console.error("PDF export error:", err);
    res.status(500).send("Error generating PDF.");
  }
};

exports.exportUserReportExcel = async (req, res) => {
  try {
    const userId = req.session.userId;
    let { month, year } = req.query;

    if (!userId) return res.status(401).send("Unauthorized");

    // Use current month/year as fallback if not provided
    const currentDate = new Date();
    month = month || (currentDate.getMonth() + 1).toString(); // Months are 0-based in JS
    year = year || currentDate.getFullYear().toString();

    const reports = await CatchReport.getReportsByUserFiltered({ userId, month, year });

    const wb = XLSX.utils.book_new();
    const wsData = [
      ["Species", "Method", "Quantity", "Location", "Status", "Date"],
      ...reports.map(report => [
        report.species ?? "N/A",
        report.method_of_fishing ?? "N/A",
        report.quantity ?? "N/A",
        report.location ?? "N/A",
        report.status ?? "N/A",
        report.date ? new Date(report.date).toISOString().split('T')[0] : "N/A"
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Catch Report");

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    const filename = `catch_report_user_${userId}_${month}_${year}.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    console.error("Excel export error:", err);
    res.status(500).send("Error generating Excel.");
  }
};

exports.viewUserCatchHistory = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.redirect('/auth/login');

    const reports = await CatchReport.getReportsByUser(userId);
    res.render('userCatchHistory', { reports, user: req.session.user || { name: "Guest" } });
  } catch (error) {
    console.error("Error fetching user catch history:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.filterReports = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.session.userId;

    let query = 'SELECT * FROM catch_reports WHERE user_id = $1';
    const params = [userId];

    if (month && month !== 'all') {
      query += ' AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3 ORDER BY date DESC';
      params.push(month, year);
    } else {
      query += ' ORDER BY date DESC';
    }

    const result = await CatchReport.query(query, params);
    const reports = result.rows;

    res.render('catch-report/partials/report-table', { reports, user: req.session.user || { name: "Guest" } });
  } catch (err) {
    console.error('Error filtering reports:', err);
    res.status(500).send('Error loading filtered reports.');
  }
};

exports.predictCatch = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).send("Unauthorized");

    // Get reports specific to this user
    const userReports = await CatchReport.getReportsByUser(userId);
    const predictions = await mlUtils.trainAndPredict(userReports);

    // Save predictions linked to user
    for (const pred of predictions) {
      await CatchReport.insertPrediction(userId, pred.species, pred.predicted_best_time, pred.predicted_quantity, pred.confidence);
    }

    res.redirect("/catch-report/predictions");
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).send("Error generating predictions.");
  }
};

exports.getPredictionsPage = async (req, res) => {
  try {
    let predictions = await CatchReport.getPredictions();

    function generateConfidence(baseConfidence) {
      const variation = (Math.random() * 0.5) - 0.25;
      let newConfidence = baseConfidence + variation;
      return Math.max(0, Math.min(100, newConfidence)).toFixed(2);
    }

    predictions = predictions.map(prediction => ({
      ...prediction,
      confidence: generateConfidence(parseFloat(prediction.confidence))
    }));

    const user = req.session.user || { name: "Guest" };

    res.render("predictions", { predictions, user });
  } catch (error) {
    console.error("Error fetching predictions:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = exports;