const stressCalculationService = require('../biz/stressCalculationService'); 
const StressService =require('../biz/userResponse');

class StressController {
    async saveAnswer(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ error: 'Unauthorized: User ID is missing' });
            }

            const userId = req.user.id;
            const { questionId, questionText, selectedAnswer, age } = req.body;

            if (!questionId || !questionText || !selectedAnswer || !age) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const result = await StressService.UserResponseService(userId, {
                questionId,
                questionText,
                selectedAnswer,
                age
            });

            // {{ edit_1 }}: Calculate and store stress level, and get the percentage
            const stressPercentage = await stressCalculationService.calculateAndStoreStressLevel(userId);

            // {{ edit_2 }}: Send the stress percentage back in the response
            res.json({
                ...result, // Optionally include previous result data if needed
                stressLevelPercentage: stressPercentage, // Add stress percentage to the response
                message: 'Answer saved and stress level calculated successfully' // Update message
            });


        } catch (error) {
            console.error('Error saving answer:', error);
            res.status(500).json({ error: 'Failed to save answer and calculate stress level' }); // Update error message
        }
    }
}

