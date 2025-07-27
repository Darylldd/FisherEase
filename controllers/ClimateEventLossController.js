const ClimateEventLossModel = require("../models/ClimateEventLossModel");
const path = require("path");
const fs = require("fs");

const ClimateEventLossController = {
    async submitLossReport(req, res) {
        try {
            const { eventType, date, speciesLost, lossKg, lossValue, description, location } = req.body;
            const userId = req.session.userId;
            let imagePath = null;

            if (!userId) return res.status(401).send("Unauthorized");

            if (req.file) {
                imagePath = `/Uploads/${req.file.filename}`;
            } else {
                return res.status(400).send("Proof image is required");
            }

            await ClimateEventLossModel.reportLoss(userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath);
            res.redirect("/climateLoss/view?success=true");
        } catch (error) {
            console.error("Error submitting loss report:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    async viewLossReports(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) return res.status(401).send("Unauthorized");

            res.render("loss-form", { user: req.session.user });
        } catch (error) {
            console.error("Error rendering loss form:", error);
            res.status(500).send("Server Error");
        }
    },

    async viewUserLossReports(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) return res.status(401).send("Unauthorized");

            const lossReports = await ClimateEventLossModel.getUserLossReports(userId);
            res.render("userLossReports", { lossReports, user: req.session.user });
        } catch (error) {
            console.error("Error fetching user loss reports:", error);
            res.status(500).send("Server Error");
        }
    },

    async viewAllLossReports(req, res) {
        try {
            console.log("Session:", req.session);
            const userRole = req.session.role;
            if (!userRole || userRole !== "admin") {
                return res.status(403).send("Access denied. Admin only.");
            }

            const lossReports = await ClimateEventLossModel.getAllLossReports();
            const success = req.query.success; // Pass success query parameter
            console.log("Loss Reports:", lossReports);
            res.render("climateAnalysis", { lossReports, user: req.session.user, success });
        } catch (error) {
            console.error("Error fetching all loss reports:", error);
            res.status(500).send("Server Error");
        }
    },

    async approveReport(req, res) {
        try {
            const { reportId } = req.params;
            const userRole = req.session.role;
            if (!userRole || userRole !== "admin") {
                return res.status(403).send("Access denied. Admin only.");
            }

            await ClimateEventLossModel.updateReportStatus(reportId, "Approved");
            res.redirect("/climateLoss/admin/analysis?success=approved");
        } catch (error) {
            console.error("Error approving report:", error);
            res.status(500).send("Server Error");
        }
    },

    async disapproveReport(req, res) {
        try {
            const { reportId } = req.params;
            const userRole = req.session.role;
            if (!userRole || userRole !== "admin") {
                return res.status(403).send("Access denied. Admin only.");
            }

            await ClimateEventLossModel.updateReportStatus(reportId, "Disapproved");
            res.redirect("/climateLoss/admin/analysis?success=disapproved");
        } catch (error) {
            console.error("Error disapproving report:", error);
            res.status(500).send("Server Error");
        }
    }
};

module.exports = ClimateEventLossController;