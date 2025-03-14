const express = require('express');
const router = express.Router();
const geetaController = require('../controllers/geetaController'); // Import geeta controller

// GET route to get a random Geeta thought
router.get('/thought', geetaController.getRandomThought);

module.exports = router; 