const StressQuestion = require('../biz/StressQuestions');

exports.getStressQuestionsByAgeGroup = async (req, res) => {
    try {
        const { ageGroup } = req.params;
        const questions = await StressQuestion.findByAgeGroup(ageGroup);
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching stress questions:', error);
        res.status(500).json({ message: 'Error fetching stress questions' });
    }
};

exports.createStressQuestion = async (req, res) => {
    try {
        const { questionText, ageGroup } = req.body;
        const newQuestion = await StressQuestion.create(questionText, ageGroup);
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error creating stress question:', error);
        res.status(500).json({ message: 'Error creating stress question' });
    }
};


