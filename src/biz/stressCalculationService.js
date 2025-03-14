// Assuming you create a new file or place this in a relevant service file
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mindride',
    password: 'ekta',
    port: 5432,
 });

async function calculateAndStoreStressLevel(userId) {
    try {
        const query = `
                     WITH UserResponsesLastHour AS (
                SELECT
                    usqf.q_id AS question_id,
                    usqf.feedback_option AS selected_option,
                    sqo.weightage
                FROM
                    user_stress_question_feedback usqf
                JOIN
                    stress_question_options sqo ON usqf.q_id = sqo.question_id AND usqf.feedback_option = sqo.option
                WHERE
                    usqf.user_id = $1
                    AND usqf.updated_at >= NOW() - INTERVAL '1 hour'
            ),
            MaxWeightagePerQuestion AS (
                SELECT
                    sq.q_id,
                    MAX(sqo.weightage) as max_weightage_per_question
                FROM
                    stress_questions sq
                JOIN
                    stress_question_options sqo ON sq.q_id = sqo.question_id
                GROUP BY
                    sq.q_id
            ),
            CalculatedStress AS (
                SELECT
                    COALESCE(SUM(ur.weightage), 0) as total_weightage,
                    (SELECT COALESCE(SUM(mwq.max_weightage_per_question), 0) FROM MaxWeightagePerQuestion mwq INNER JOIN UserResponsesLastHour urlh ON mwq.q_id = urlh.question_id) as max_possible_weightage
                FROM UserResponsesLastHour ur
            )
            INSERT INTO user_stress_levels (user_id, stress_percentage, calculation_timestamp)
            SELECT
                $1,
                CASE
                    WHEN max_possible_weightage > 0 THEN ROUND((total_weightage::decimal / max_possible_weightage) * 100)::INTEGER -- Rounded to integer
                    ELSE 0
                END AS stress_percentage,
                NOW()
            FROM CalculatedStress
            RETURNING stress_percentage, (SELECT total_weightage FROM CalculatedStress) as total_weightage, (SELECT max_possible_weightage FROM CalculatedStress) as max_possible_weightage; -- Return intermediate values for logging
        `;

        const result = await pool.query(query, [userId]);
        const stressPercentage = result.rows[0]?.stress_percentage || 0;
        const totalWeightage = result.rows[0]?.total_weightage || 0; // Extract total_weightage from result
        const maxPossibleWeightage = result.rows[0]?.max_possible_weightage || 0; // Extract max_possible_weightage

        console.log("----- Stress Calculation Log -----");
        console.log("User ID:", userId);
        console.log("Total Weightage (from UserResponsesLastHour):", totalWeightage); // Log total_weightage
        console.log("Max Possible Weightage (from MaxWeightagePerQuestion):", maxPossibleWeightage); // Log max_possible_weightage
        console.log("Calculated Stress Percentage:", stressPercentage);
        console.log("----------------------------------");

        console.log(`Stress level calculated and stored for user ${userId}: ${stressPercentage}%`);
        return stressPercentage;
    } catch (error) {
        console.error('Error calculating and storing stress level:', error);
        throw error; // Or handle the error as needed
    }
}

module.exports = { calculateAndStoreStressLevel };