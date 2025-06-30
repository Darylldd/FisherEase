const ClimateEventLossModel = require("../models/ClimateEventLossModel");
const path = require("path");

const ClimateEventLossController = {
    async showReportForm(req, res) {
        try {
            if (!req.session.userId) return res.redirect('/auth/login');
            res.render("loss-form", { 
                user: req.session.user,
                success: req.query.success 
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

            if (!userId) return res.status(401).send("Unauthorized");
            if (!req.file) return res.status(400).send("Proof image is required");

            const imagePath = `/uploads/${req.file.filename}`;

            await ClimateEventLossModel.reportLoss(
                userId, 
                eventType, 
                date, 
                speciesLost, 
                parseFloat(lossKg), 
                parseFloat(lossValue), 
                description, 
                location, 
                imagePath
            );
            
            res.redirect("/climateLoss/view?success=true");
        } catch (error) {
            console.error("Error submitting loss report:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    async viewLossReports(req, res) {
        try {
            if (!req.session.userId) return res.redirect('/auth/login');
            
            const lossReports = await ClimateEventLossModel.getUserLossReports(req.session.userId);
            res.render("loss-reports", { 
                user: req.session.user,
                lossReports,
                success: req.query.success 
            });
        } catch (error) {
            console.error("Error fetching loss reports:", error);
            res.status(500).send("Server Error");
        }
    }
};

module.exports = ClimateEventLossController;