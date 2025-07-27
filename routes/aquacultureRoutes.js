const express = require('express');
const router = express.Router();
const aquacultureController = require('../controllers/aquacultureController');
const registerController = require('../controllers/registerController');

// Route for the registration form
router.get('/register', registerController.aquacultureForm);

// Route for submitting the registration form
router.post('/register', aquacultureController.registerAquaculture);

// Route for displaying all facilities with pagination
router.get('/list', aquacultureController.getAllFacilities);

// Route for editing a facility (form)
router.get('/edit/:id', aquacultureController.editFacilityForm);

// Route for updating a facility
router.post('/edit/:id', aquacultureController.updateFacility);

// Route for deleting a facility
router.get('/delete/:id', aquacultureController.deleteFacility);

module.exports = router;