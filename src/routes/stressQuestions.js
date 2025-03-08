const express = require('express');
const router = express.Router();
const stressQuestionsController = require('../controllers/stressQuestionsController');

// GET stress questions by age group
router.get('/age-group/:ageGroup', stressQuestionsController.getStressQuestionsByAgeGroup);

// POST create a new stress question
router.post('/create', stressQuestionsController.createStressQuestion);

module.exports = router;