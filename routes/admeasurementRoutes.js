const express = require('express');
const router = express.Router();
const adController = require('../controllers/admeasurementController');

router.get('/admeasurement-form', adController.showAdmeasurementForm);
router.post('/admeasurement-form', adController.submitAdmeasurementForm);
router.get('/admeasurement-forms', adController.listAdmeasurements);

module.exports = router;
