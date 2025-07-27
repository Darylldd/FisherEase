const express = require('express');
const router = express.Router();
const fishingActivityController = require('../controllers/fishingActivityController');

router.get('/fishing-activity/export/excel', fishingActivityController.exportExcel);
router.get('/fishing-activity/export/pdf', fishingActivityController.exportPDF);
router.get('/fishing-activity-list', fishingActivityController.getFishingActivityList);
router.get('/fishing-activity', fishingActivityController.getFishingActivitiesForAdmin);
module.exports = router;
