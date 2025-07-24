const express = require('express');
const router = express.Router();
const fishingActivityController = require('../controllers/fishingActivityController');


router.get('/fishing-activity-tracking', fishingActivityController.getFishingActivities);


router.post('/fishing-activity-tracking/add', fishingActivityController.addFishingActivity);

module.exports = router;
