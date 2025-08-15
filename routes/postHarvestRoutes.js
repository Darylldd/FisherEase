const express = require('express');
const router = express.Router();
const postHarvestController = require('../controllers/postHarvestController');

router.get('/register/post-harvest', postHarvestController.getRegisterForm);
router.post('/register/post-harvest', postHarvestController.registerPostHarvest);
router.get('/admin/post-harvest', postHarvestController.getAdminTable);

module.exports = router;