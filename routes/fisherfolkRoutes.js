const express = require('express');
const router = express.Router();
const fisherfolkController = require('../controllers/fisherfolkController');

// Render registration form
router.get('/register/fisherfolk', (req, res) => {
    res.render('register-fisherfolk');  // Ensure you have `register-fisherfolk.ejs`
});

// Handle form submission
router.post('/register/fisherfolk', fisherfolkController.registerFisherfolk);

// Render fisherfolk table
router.get('/fisherfolk/table', fisherfolkController.getFisherfolkTable);

module.exports = router;