const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Import the book controller

// GET route to list book files
router.get('/', bookController.getBookList);

// GET route to stream a specific book file
router.get('/book-content/:filename', bookController.streamBookFile);

module.exports = router; 