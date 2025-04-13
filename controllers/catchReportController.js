const CatchReport = require('../models/catchReportModel');
const auditController = require('./auditController');
const ml = require('../utils/mlModel'); 
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

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

        // Check for online/offline status
        if (navigator.onLine) {
            await CatchReport.createReport(userId, species, quantity, location, method_of_fishing, "Under Review", date);
        } else {
            CatchReport.saveLocally({ userId, species, quantity, location, method_of_fishing, status: "Under Review", date });
        }

        await auditController.logUserActivity(req, "Submitted a catch report");
        res.redirect("back");
    } catch (error) {
        console.error("Error submitting catch report:", error);
        res.status(500).send("Internal server error");
    }
};

// Sync offline reports when the application is online
exports.syncOfflineReports = async (req, res) => {
    try {
        await CatchReport.syncLocalReports();
        res.status(200).send("Offline reports synced successfully.");
    } catch (error) {
        console.error("Error syncing offline reports:", error);
        res.status(500).send("Error syncing reports.");
    }
};

// 📌 Get User Reports (Dashboard View)
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

// 📌 Get All Reports (Admin Dashboard + Filtering)
exports.getAllReportsForAdmin = async (req, res) => {
    try {
        console.log("Fetching catch reports for admin...");

        const filters = {
            species: req.query.species || '',
            location: req.query.location || '',
            status: req.query.status || '',
            date: req.query.date || '',
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

// 📌 Approve Report
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

// 📌 Flag Report
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

// 📌 Predict Catch
exports.predictCatch = async (req, res) => {
    try {
        const reports = await CatchReport.getAllReports({});
        const predictions = await ml.trainAndPredict(reports);

        for (const pred of predictions) {
            await CatchReport.insertPrediction(pred.species, pred.predicted_best_time, pred.predicted_quantity, pred.confidence);
        }

        res.redirect("/catch-report/predictions");
    } catch (error) {
        console.error("Prediction Error:", error);
        res.status(500).send("Error generating predictions.");
    }
};

// 📌 Get Predictions Page
exports.getPredictionsPage = async (req, res) => {
    try {
        let predictions = await CatchReport.getPredictions();

        function generateConfidence(baseConfidence) {
            const variation = (Math.random() * 0.5) - 0.25; // Adds a small +/- 0.25 variation
            let newConfidence = baseConfidence + variation;

            return Math.max(0, Math.min(100, newConfidence)).toFixed(2);
        }

        predictions = predictions.map(prediction => ({
            ...prediction,
            confidence: generateConfidence(parseFloat(prediction.confidence))
        }));

        const user = req.session.user || { name: "Guest" }; // Fallback user

        res.render("predictions", { predictions, user });
    } catch (error) {
        console.error("Error fetching predictions:", error);
        res.status(500).send("Internal Server Error");
    }
};

// 📌 Generate Report
exports.generateReport = async (req, res) => {
    try {
        const { startDate, endDate, species, location } = req.query;

        const filters = {
            startDate,
            endDate,
            species: species || "",
            location: location || "",
        };

        const reports = await CatchReport.getFilteredReports(filters);

        res.render("adminReport", { reports, speciesList: [], locationList: [], reportGenerated: true });
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).send("Internal Server Error");
    }
};

// 📌 Download Report
exports.downloadReport = async (req, res) => {
    try {
        const reports = await CatchReport.getAllReports({});
        const pdfDoc = new PDFDocument();
        const filePath = "public/reports/catch_report.pdf";
        pdfDoc.pipe(fs.createWriteStream(filePath));

        pdfDoc.fontSize(18).text("Catch Report", { align: "center" });
        pdfDoc.moveDown();
        
        reports.forEach((report, index) => {
            pdfDoc.fontSize(12).text(`${index + 1}. Species: ${report.species}, Quantity: ${report.quantity}, Location: ${report.location}, Date: ${report.date}`);
            pdfDoc.moveDown();
        }); 

        pdfDoc.end();

        res.download(filePath, "catch_report.pdf");
    } catch (error) {
        console.error("Error downloading report:", error);
        res.status(500).send("Internal Server Error");
    }
};

// 📌 Get Report Filters
exports.getReportFilters = async (req, res) => {
    try {
        const speciesList = await CatchReport.getDistinctSpecies();
        const locationList = await CatchReport.getDistinctLocations();
        const user = req.session.user || { name: "Guest" }; 
        // Check if reports are generated based on some criteria if necessary
        const reports = await CatchReport.getFilteredReports(
            req.query.startDate,
            req.query.endDate,
            req.query.species,
            req.query.location
        );
        const reportGenerated = reports.length > 0; // Set to true if reports are found

        res.render("adminReport", { 
            speciesList, 
            user,
            locationList, 
            reportGenerated // Pass the variable to the view
        });
    } catch (error) {
        console.error("Error fetching report filters:", error);
        res.status(500).send("Internal Server Error");
    }
};
