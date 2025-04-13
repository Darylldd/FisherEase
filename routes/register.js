// routes/register.js
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const aquacultureController = require('../controllers/aquacultureController');

// Fisherfolk Registration Route
router.get('/fisherfolk', registerController.fisherfolkForm);  // Renders the form
router.get('/register/fisherfolk', registerController.showFisherfolkRegistration);  // Renders the form with user data
router.get('/aquaculture', registerController.aquacultureForm);  // Other registration form

module.exports = router;
