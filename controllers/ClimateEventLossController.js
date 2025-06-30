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
                imagePath = `/uploads/${req.file.filename}`;
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

            const lossReports = await ClimateEventLossModel.getUserLossReports(userId);
            res.render("loss-form", { lossReports });
        } catch (error) {
            console.error("Error fetching loss reports:", error);
            res.status(500).send("Server Error");
        }
    },
    async adminViewAllLossReports(req, res) {
    try {
      // Optional: Admin-only check
      if (!req.session.isAdmin) return res.status(403).send("Forbidden");

      const reports = await ClimateEventLossModel.getAllLossReportsWithUser();
      res.render("climateAnalysis", { climateData: reports });
    } catch (error) {
      console.error("Error loading admin climate loss reports:", error);
      res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = ClimateEventLossController;