const ClimateEventLossModel = require("../models/ClimateEventLossModel");
const path = require("path");

const ClimateEventLossController = {
    async showReportForm(req, res) {
        try {
            if (!req.session.userId) return res.redirect('/auth/login');
            res.render("loss-form", { 
                user: req.session.user || { name: "User" },
                success: req.query.success === "true"
            });
        } catch (error) {
            console.error("Error showing report form:", error);
            res.status(500).send("Server Error");
        }
    },

    async submitLossReport(req, res) {
        try {
            const { eventType, date, speciesLost, lossKg, lossValue, description, location } = req.body;
            const userId = req.session.userId;

            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized: No user session" });
            }
            if (!req.file) {
                return res.status(400).json({ success: false, message: "Proof image is required" });
            }
            if (!eventType || !date || !speciesLost || !lossKg || !lossValue || !description || !location) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const imagePath = `/Uploads/${req.file.filename}`;

            const reportId = await ClimateEventLossModel.reportLoss(
                userId, eventType, date, speciesLost, parseFloat(lossKg), parseFloat(lossValue), description, location, imagePath
            );
            
            res.json({ success: true, redirect: `/climateLoss/view?success=true&reportId=${reportId}` });
        } catch (error) {
            console.error("Error submitting loss report:", error);
            res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
        }
    },

    async viewLossReports(req, res) {
        try {
            if (!req.session.userId) return res.redirect('/auth/login');
            
            const lossReports = await ClimateEventLossModel.getUserLossReports(req.session.userId);
            res.render("loss-reports", { 
                user: req.session.user || { name: "User" },
                lossReports,
                success: req.query.success === "true"
            });
        } catch (error) {
            console.error("Error fetching loss reports:", error);
            res.status(500).send("Server Error");
        }
    },

    async adminViewAllReports(req, res) {
        try {
            if (!req.session.userId || !req.session.isAdmin) return res.redirect('/auth/login');
            
            const allReports = await ClimateEventLossModel.getAllLossReports();
            res.render("climateAnalysis-admin", { 
                user: req.session.user || { name: "User" },
                climateData: allReports
            });
        } catch (error) {
            console.error("Error fetching all reports:", error);
            res.status(500).send("Server Error");
        }
    },

    async updateReportStatus(req, res) {
        try {
            const { reportId, status } = req.body;
            const adminId = req.session.userId;

            if (!adminId || !req.session.isAdmin) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            const updatedReport = await ClimateEventLossModel.updateReportStatus(reportId, status, adminId);
            res.json({ success: true, report: updatedReport });
        } catch (error) {
            console.error("Error updating report status:", error);
            res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
        }
    }
};

module.exports = ClimateEventLossController;