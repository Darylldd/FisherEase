const ClimateEventLossModel = require("../models/ClimateEventLossModel");

const ClimateEventLossController = {
    async submitLossReport(req, res) {
        try {
            const { eventType, date, speciesLost, lossKg, lossValue, description, location } = req.body;
            const userId = req.session.userId;

            if (!userId) return res.status(401).send("Unauthorized");

            await ClimateEventLossModel.reportLoss(userId, eventType, date, speciesLost, lossKg, lossValue, description, location);
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
            res.render("loss-form", { lossReports });
        } catch (error) {
            console.error("Error fetching loss reports:", error);
            res.status(500).send("Server Error");
        }
    }
};

module.exports = ClimateEventLossController;
