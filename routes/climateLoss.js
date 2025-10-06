const express = require("express");
const router = express.Router();
const {
    upload,
    submitLossReport,
    viewLossReports,
    viewUserLossReports,
    viewAllLossReports,
    approveReport,
    disapproveReport
} = require("../controllers/ClimateEventLossController");

// Only one upload middleware — from Cloudinary setup
router.post("/report", upload.single("proofImage"), submitLossReport);
router.get("/view", viewLossReports);
router.get("/view/reports", viewUserLossReports);
router.get("/admin/analysis", viewAllLossReports);
router.post("/admin/approve/:reportId", approveReport);
router.post("/admin/disapprove/:reportId", disapproveReport);

module.exports = router;
