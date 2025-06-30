// controllers/ClimateEventLossController.js
const ClimateEventLossModel = require("../models/ClimateEventLossModel");
const path = require("path");
const fs = require("fs");

const ClimateEventLossController = {
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