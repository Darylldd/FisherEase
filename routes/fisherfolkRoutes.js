const express = require('express');
const router = express.Router();
const fisherfolkController = require('../controllers/fisherfolkController');

// Render registration form
router.get('/register/fisherfolk', (req, res) => {
    res.render('register-fisherfolk');
});

// Handle form submission
router.post('/register/fisherfolk', fisherfolkController.registerFisherfolk);

// Render fisherfolk table
router.get('/fisherfolk/table', fisherfolkController.getFisherfolkTable);

// Render edit form
router.get('/fisherfolk/edit/:id', fisherfolkController.editFisherfolkForm);

// Handle edit submission
router.post('/fisherfolk/edit/:id', fisherfolkController.updateFisherfolk);

// Handle delete
router.get('/fisherfolk/delete/:id', fisherfolkController.deleteFisherfolk);

module.exports = router;