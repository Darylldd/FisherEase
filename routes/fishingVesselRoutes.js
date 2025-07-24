const express = require('express');
const router = express.Router();
const fishingVesselController = require('../controllers/fishingVesselController');

router.get('/fishing-vessel-registration', fishingVesselController.showRegistrationForm);
router.post('/fishing-vessel-registration', fishingVesselController.submitRegistration);
router.get('/fishing-vessel-registrations', fishingVesselController.listRegistrations);

// ✅ Add export routes here:
router.get('/fishing-vessel-registrations/export/excel', fishingVesselController.exportExcel);
router.get('/fishing-vessel-registrations/export/pdf', fishingVesselController.exportPDF);

module.exports = router;
