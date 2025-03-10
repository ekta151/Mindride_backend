const express = require('express');
const router = express.Router();
const userResponsesController = require('../controllers/userResponsesController');
const {verifyToken} = require('../middleware/authMiddleware');

// POST save user responses
router.post('/', verifyToken, userResponsesController.saveUserResponse);


module.exports = router;