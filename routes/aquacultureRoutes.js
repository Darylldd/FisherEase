// routes/aquacultureRoutes.js
const express = require('express');
const router = express.Router();
const aquacultureController = require('../controllers/aquacultureController');
const registerController = require('../controllers/registerController');

// Route for the registration form
router.get('/register', registerController.aquacultureForm);  // Other registration form


// Route for submitting the registration form
router.post('/register', aquacultureController.registerAquaculture);

module.exports = router;
