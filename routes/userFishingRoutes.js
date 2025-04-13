const express = require('express');
const router = express.Router();
const fishingActivityController = require('../controllers/fishingActivityController');

// 🚀 User Route - Fishing Activity Log Form
router.get('/fishing-activity-log', fishingActivityController.getFishingActivitiesForUser);
router.post('/fishing-activity-log', fishingActivityController.addFishingActivity);

module.exports = router;
