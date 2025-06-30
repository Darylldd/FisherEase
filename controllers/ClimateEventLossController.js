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
            
            res.redirect("/view?success=true");
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
        
        // Transform data to ensure consistent structure
        const processedReports = reports.map(report => ({
            ...report,
            user_name: report.user_name || `User (ID: ${report.user_id})`
        }));

        res.render("climateAnalysis", {
            climateData: processedReports,
            user: req.session.user
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).render('error', {
            message: "Database Error",
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
}
};

module.exports = ClimateEventLossController;