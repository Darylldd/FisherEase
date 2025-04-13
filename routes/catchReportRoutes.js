const express = require('express');
const router = express.Router();
const catchReportController = require('../controllers/catchReportController');

// User Routes
router.get('/', catchReportController.getUserReports);
router.post('/', catchReportController.submitCatchReport);

// Admin Routes
router.get('/review', catchReportController.getAllReportsForAdmin);
router.get('/predictions', catchReportController.getPredictionsPage);
router.get('/admin/report', catchReportController.getReportFilters);
router.get('/admin/generate-report', catchReportController.generateReport);
router.get('/admin/download-report', catchReportController.downloadReport);


router.post('/approve/:id', catchReportController.approveReport);
router.post('/flag/:id', catchReportController.flagReport);
router.post('/sync-offline-reports', catchReportController.syncOfflineReports);
module.exports = router;
