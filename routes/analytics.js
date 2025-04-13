const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/analytics', dashboardController.getAnalyticsData);

module.exports = router;
