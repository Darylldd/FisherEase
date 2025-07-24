const CatchReport = require('../models/catchReportModel');
const auditController = require('./auditController');
const ml = require('../utils/mlModel'); 
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx"); // Import xlsx library

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

    res.render('catch-report', { reports });
  } catch (error) {
    console.error("Error fetching user reports:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllReportsForAdmin = async (req, res) => {
  try {
    console.log("Fetching catch reports for admin...");

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

    res.render('catchReportReview', { reports, filters, user: req.user || null });
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

    res.render("adminReport", { reports, speciesList: [], locationList: [], reportGenerated: true });
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

    const reports = await CatchReport.getAllReports(filters);
    const pdfDoc = new PDFDocument();
    const filePath = path.join(__dirname, "../public/reports/catch_report.pdf");
    pdfDoc.pipe(fs.createWriteStream(filePath));

    let title = "Catch Report";
    if (filters.month && filters.year) {
      title += ` - ${filters.month}/${filters.year}`;
    } else if (filters.month) {
      title += ` - Month ${filters.month}`;
    } else if (filters.year) {
      title += ` - Year ${filters.year}`;
    }
    pdfDoc.fontSize(18).text(title, { align: "center" });
    pdfDoc.moveDown();

    reports.forEach((report, index) => {
      pdfDoc.fontSize(12).text(`${index + 1}. User: ${report.user_name}, Species: ${report.species}, Quantity: ${report.quantity}, Location: ${report.location}, Method: ${report.method_of_fishing}, Status: ${report.status}, Date: ${new Date(report.date).toISOString().split('T')[0]}`);
      pdfDoc.moveDown();
    });

    pdfDoc.end();

    res.download(filePath, `catch_report${filters.month && filters.year ? `_${filters.month}_${filters.year}` : ''}.pdf`);
  } catch (error) {
    console.error("Error downloading report:", error);
    res.status(500).send("Internal Server Error");
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
    if (!userId) return res.redirect('/login');

    const reports = await CatchReport.getReportsByUser(userId);
    res.render('userCatchHistory', { reports });
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

    res.render('catch-report/partials/report-table', { reports });
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
    const predictions = await ml.trainAndPredict(userReports);

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