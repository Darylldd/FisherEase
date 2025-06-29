const ClimateEventLossModel = require("../models/ClimateEventLossModel");
const path = require("path");
const fs = require("fs");

const ClimateEventLossController = {
    async submitLossReport(req, res) {
        try {
            const { eventType, date, speciesLost, lossKg, lossValue, description, location } = req.body;
            const userId = req.session.userId;
            let imagePath = null;

            // Validate session
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized: No user session found" });
            }

            // Validate form fields
            if (!eventType || !date || !speciesLost || !lossKg || !lossValue || !description || !location) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            // Validate numeric fields
            if (isNaN(lossKg) || isNaN(lossValue) || lossKg < 0 || lossValue < 0) {
                return res.status(400).json({ success: false, message: "Loss (Kg) and Loss Value must be valid non-negative numbers" });
            }

            // Validate file upload
            if (!req.file) {
                return res.status(400).json({ success: false, message: "Proof image is required" });
            }
            imagePath = `/Uploads/${req.file.filename}`;

            // Verify Uploads directory exists
            const uploadDir = path.join(__dirname, "../Uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Submit to database
            await ClimateEventLossModel.reportLoss(
                userId, eventType, date, speciesLost, 
                parseFloat(lossKg), parseFloat(lossValue), description, location, imagePath
            );

            res.redirect("/climateLoss/view?success=true");
        } catch (error) {
            console.error("Error submitting loss report:", error);
            res.status(500).json({ 
                success: false, 
                message: `Server Error: ${error.message}`, 
                stack: error.stack // Include stack trace for debugging
            });
        }
    },

    async viewLossReports(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized: No user session found" });
            }

            const lossReports = await ClimateEventLossModel.getUserLossReports(userId);
            res.render("climate-loss-view", { 
                lossReports, 
                user: req.session.user || { name: "User" }
            });
        } catch (error) {
            console.error("Error fetching loss reports:", error);
            res.status(500).json({ 
                success: false, 
                message: `Server Error: ${error.message}`, 
                stack: error.stack
            });
        }
    },

    async viewAllLossReports(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized: No user session found" });
            }

            const lossReports = await ClimateEventLossModel.getAllLossReports();
            res.render("admin/climate-loss-table", { 
                lossReports, 
                user: req.session.user || { name: "Admin" }
            });
        } catch (error) {
            console.error("Error fetching all loss reports:", error);
            res.status(500).json({ 
                success: false, 
                message: `Server Error: ${error.message}`, 
                stack: error.stack
            });
        }
    }
};

module.exports = ClimateEventLossController;