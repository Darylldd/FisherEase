const express = require('express');
const router = express.Router();
const postHarvestController = require('../controllers/postHarvestController');

router.get('/register/post-harvest', postHarvestController.getRegisterForm);
router.post('/register/post-harvest', postHarvestController.registerPostHarvest);
router.get('/admin/post-harvest', postHarvestController.getAdminTable);
// Edit route (display edit form)
router.post('/admin/post-harvest/edit', postHarvestController.getEditForm);

// Update route (submit changes)
router.post('/admin/post-harvest/update', postHarvestController.updatePostHarvest);

// Delete route
router.post('/admin/post-harvest/delete', postHarvestController.deletePostHarvest);

module.exports = router;