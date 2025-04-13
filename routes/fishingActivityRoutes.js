const express = require('express');
const router = express.Router();
const fishingActivityController = require('../controllers/fishingActivityController');

// 🚀 GET: Display Fishing Activity Tracking (Admin Dashboard)
router.get('/fishing-activity-tracking', fishingActivityController.getFishingActivities);

// 🚀 POST: Add Fishing Activity
router.post('/fishing-activity-tracking/add', fishingActivityController.addFishingActivity);

module.exports = router;
