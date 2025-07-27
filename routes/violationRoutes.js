const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');

router.get('/violation-notifications', violationController.getViolations);
router.post('/violation-notifications/add', violationController.addViolation);
router.post('/violation-notifications/update', violationController.updateViolation);
router.get('/violation-history', violationController.getUserViolations);
router.get('/violations-table', violationController.getViolations);
module.exports = router;