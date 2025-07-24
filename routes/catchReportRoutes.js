const express = require('express');
const router = express.Router();
const catchReportController = require('../controllers/catchReportController');

router.get('/', catchReportController.getUserReports);
router.post('/', catchReportController.submitCatchReport);
router.get('/review', catchReportController.getAllReportsForAdmin);
router.get('/predictions', catchReportController.getPredictionsPage);
router.get('/admin/report', catchReportController.getReportFilters);
router.get('/admin/generate-report', catchReportController.generateReport);
router.get('/admin/download-report', catchReportController.downloadReport);
router.get('/admin/download-excel-report', catchReportController.downloadExcelReport);
router.post('/approve/:id', catchReportController.approveReport);
router.post('/flag/:id', catchReportController.flagReport);
router.post('/sync-offline-reports', catchReportController.syncOfflineReports);
router.get('/export/pdf', catchReportController.exportUserReportPDF);
router.get('/export/excel', catchReportController.exportUserReportExcel);
router.get('/history', catchReportController.viewUserCatchHistory);
router.get('/filter', catchReportController.filterReports);
router.get('/predict-catch', catchReportController.predictCatch);

module.exports = router;