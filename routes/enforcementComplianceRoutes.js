const express = require('express');
const router = express.Router();
const enforcementComplianceController = require('../controllers/enforcementComplianceController');

router.get('/', enforcementComplianceController.enforcementComplianceLogging);

module.exports = router;