// controllers/ClimateEventLossController.js
const ClimateEventLossModel = require("../models/ClimateEventLossModel");
const path = require("path");
const fs = require("fs");

const ClimateEventLossController = {
    async submitLossReport(req, res) {
        try {
            const { eventType, date, speciesLost, lossKg, lossValue, description, location } = req.body;
            const userId = req.session.userId;
            
            if (!userId) return res.status(401).send("Unauthorized");
            if (!req.file) return res.status(400).send("Proof image is required");

            const imagePath = `/uploads/${req.file.filename}`;
            
            await ClimateEventLossModel.reportLoss(
                userId, eventType, date, speciesLost, 
                lossKg, lossValue, description, location, imagePath
            );
            
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

            const lossReports = await ClimateEventLossModel.getUserLossReports(userId);
            res.render("loss-form", { 
                lossReports,
                user: req.session.user 
            });
        } catch (error) {
            console.error("Error fetching loss reports:", error);
            res.status(500).send("Server Error");
        }
    },

   async adminViewAllLossReports(req, res) {
        try {
            if (!req.session.isAdmin) {
                return res.status(403).render('error', { 
                    message: "Forbidden: Admin access required" 
                });
            }

            const reports = await ClimateEventLossModel.getAllLossReportsWithUser();
            
            // Debug: Log the first report to verify structure
            if (reports.length > 0) {
                console.log("Sample report data:", {
                    id: reports[0].id,
                    user_name: reports[0].user_name,
                    date: reports[0].date,
                    formatted_date: reports[0].formatted_date
                });
            }

            res.render("climateAnalysis", {
                climateData: reports,
                user: req.session.user
            });
        } catch (error) {
            console.error("PostgreSQL Controller Error:", error);
            res.status(500).render('error', {
                message: "Database Error",
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
};

module.exports = ClimateEventLossController;