const express = require('express');
const router = express.Router();
const adController = require('../controllers/admeasurementController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

router.get('/admeasurement-form', adController.showAdmeasurementForm);
router.post('/admeasurement-form', upload.single('mayor_signature'),adController.submitAdmeasurementForm);
router.get('/admeasurement-forms', adController.listAdmeasurements);

module.exports = router;
