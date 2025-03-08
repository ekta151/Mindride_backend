const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mindride',
    password: 'ekta',
    port: 5432,
});


exports.saveUserResponses = async (req, res) => {
    try {
        const userId = req.userId;
        const { answers } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'User ID is required' });
        }

        if (!answers || Object.keys(answers).length === 0) {
            return res.status(400).json({ message: 'Answers are required' });
        }

        for (const questionId in answers) {
            const option = answers[questionId];

            if (!option) {
                console.warn(`No option provided for question ID: ${questionId}`);
                continue; // Skip to the next question if no option is provided
            }

            // let weightage = 0;
            // try {
            //     // Retrieve weightage from the database based on questionId and option
            //     const weightageResult = await pool.query(
            //         `
            //         SELECT sqo.weightage
            //         FROM stress_question_options sqo
            //         JOIN stress_questions sq ON sqo.question_id = sq.q_id
            //         WHERE sq.q_id = $1 AND sqo.option = $2
            //         `,
            //         [questionId, option]
            //     );

            //     if (weightageResult.rows.length > 0) {
            //         weightage = weightageResult.rows[0].weightage;
            //     } else {
            //         console.warn(`No weightage found for question ID: ${questionId} and option: ${option}`);
            //     }
            // } catch (dbError) {
            //     console.error(`Error retrieving weightage for question ID ${questionId}:`, dbError);
            //     // Handle the error appropriately, e.g., set a default weightage or skip the question
            //     continue;
            // }

            // totalStressScore += weightage;

            

            try {
                await pool.query(
                    'INSERT INTO user_stress_question_feedback (user_id, q_id, feedback_option) VALUES ($1, $2, $3)',
                    [userId, questionId, option]
                );
            } catch (dbError) {
                console.error(`Error saving response for question ID ${questionId}:`, dbError);
                return res.status(500).json({ message: 'Error saving user responses', error: dbError.message });
            }
        }
        // Determine stress level based on total score
    //     let stressLevel = 'Low';
    //     if (totalStressScore > 10 && totalStressScore <= 20) {
    //         stressLevel = 'Moderate';
    //     } else if (totalStressScore > 20) {
    //         stressLevel = 'High';
    //     }
        res.status(201).json({ message: 'User responses saved successfully' });
        console.log("response stored succesfully")
    } catch (error) {
        console.error('Error saving user responses:', error);
        res.status(500).json({ message: 'Error saving user responses', error: error.message });
    }
}

