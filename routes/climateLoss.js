const express = require("express");
const router = express.Router();
const ClimateEventLossController = require("../controllers/ClimateEventLossController");

router.post("/report", ClimateEventLossController.submitLossReport);
router.get("/view", ClimateEventLossController.viewLossReports);

module.exports = router;
