const express = require('express');
const router = express.Router();
const StressController = require('../controllers/stressController');
// const auth = require('../middleware/authMiddleware');

// All routes require authentication
// router.use(auth);

// Save an answer to a question
router.post('/answer', StressController.saveAnswer);

// Save final results
router.post('/results', StressController.saveResults);

// Get assessment history
router.get('/history', StressController.getHistory);

module.exports = router;
