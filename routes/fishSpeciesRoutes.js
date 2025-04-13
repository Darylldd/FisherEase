const express = require('express');
const router = express.Router();
const fishSpeciesController = require('../controllers/fishSpeciesController');

// User Routes
router.get('/fish-species', fishSpeciesController.getAllFishSpecies);
router.get('/fish-species/:id', fishSpeciesController.getSpeciesDetails);

// Admin Routes
router.get('/admin/fish-species', fishSpeciesController.getAdminFishSpecies);

router.get("/admin/fish-species/add", fishSpeciesController.addSpeciesForm);
router.post('/admin/fish-species/add', 
    fishSpeciesController.upload.single('image'), // Now this will work
    fishSpeciesController.addFishSpecies
);
router.post('/admin/fish-species/edit/:id', fishSpeciesController.updateFishSpecies);
router.post('/admin/fish-species/delete/:id', fishSpeciesController.deleteFishSpecies);


router.get('/fish-species/search', fishSpeciesController.searchFishSpecies);

module.exports = router;