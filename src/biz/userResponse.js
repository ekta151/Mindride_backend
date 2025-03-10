const { Pool } = require("pg");
const {
  calculateAndStoreStressLevel,
} = require("../biz/stressCalculationService");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mindride",
  password: "ekta",
  port: 5432,
});

class UserResponseService {
  async saveUserResponses(userId, answers) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      if (!answers || Object.keys(answers).length === 0) {
        throw new Error("Answers are required");
      }

      for (const [questionId, option] of Object.entries(answers)) {
        // ... existing code ...
        try {
          await pool.query(
            "INSERT INTO user_stress_question_feedback (user_id, q_id, feedback_option) VALUES ($1, $2, $3)",
            [userId, questionId, option]
          );
        } catch (dbError) {
          console.error(
            `Error saving response for question ID ${questionId}:`,
            dbError
          );
          throw new Error(`Database error saving response: ${dbError.message}`);
        }
      }

      try {
        // Call the stress calculation function after storing the response
        const stressPercentage = await calculateAndStoreStressLevel(userId);
        console.log(
          `Stress level calculated after response: ${stressPercentage}%`
        );
        return { success: true, stressPercentage }; // Or return relevant data
      } catch (error) {
        console.error("Error calculating stress level:", error);
        // Handle error appropriately, maybe log it and return success: false
        return { success: false, error: "Failed to calculate stress level" };
      }

    } catch (error) {
      console.error("Error in saveUserResponses service:", error);
      throw error;
    }
  }
}

module.exports = { UserResponseService: new UserResponseService() };
