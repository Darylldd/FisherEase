const express = require('express');
const router = express.Router();
const catchController = require('../controllers/catchController');

router.get('/predict-catch', catchController.predictCatch);

module.exports = router;
