const { Pool } = require('pg');

// Database Connection Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mindride',
    password: 'ekta',
    port: 5432, // Default PostgreSQL port
});

async function populateQuestions() {
  try {
    // Age Group 5-16
    const questions5_16 = [
      {
        id: 1,
        question: "How often do you feel worried about school?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 2,
        question: "Do you feel pressure from homework or exams?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 3,
        question: "How often do you feel nervous about making friends?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 4,
        question: "Do you worry about what others think of you?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 5,
        question: "How often do you feel overwhelmed by school activities?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 6,
        question: "Do you sometimes have trouble sleeping because you're worried about things?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 7,
        question: "How often do you feel like you're not good at anything?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 8,
        question: "Do you ever feel scared or worried about things that other kids don't seem to mind?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 9,
        question: "How often do you feel like you're not good at anything?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 10,
        question: "Do you have trouble concentrating or relaxing because you're always thinking about things that might go wrong?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 11,
        question: "Do you avoid certain situations because they make you feel anxious?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 12,
        question: "Do you ever feel like your heart is racing or you can't breathe when you're worried?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
    ];

    // Age Group 17-22
    const questions17_22 = [
      {
        id: 1,
        question: "How stressed do you feel about your academic performance?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 2,
        question: "Do you feel pressure about your future career choices?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 3,
        question: "How often do you feel overwhelmed by college/university workload?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 4,
        question: "Do you worry about balancing social life and studies?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 5,
        question: "How often do you feel anxious about becoming independent?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 6,
        question: "How often do you feel like you're not good at anything?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 7,
        question: "How often do you find yourself worrying about things that might happen in the future?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 8,
        question: "Do you have difficulty controlling your worries?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 9,
        question: "Do you find it hard to concentrate or focus on tasks?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 10,
        question: "Do you have trouble sleeping because of racing thoughts or worries?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 11,
        question: "Do you feel anxious when meeting new people or speaking in public?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 12,
        question: "Do you avoid social situations because you're afraid of being judged or embarrassed?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]

      },
      {
        id: 13,
        question: "Do you worry about saying or doing something wrong in social situations?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 14,
        question: "Have you ever experienced a sudden feeling of intense fear or discomfort that comes on quickly and peaks within minutes?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 15,
        question: "During these episodes, do you experience physical symptoms like a racing heart, sweating, trembling, or shortness of breath",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      

      // Add more questions here for the 17-22 age group
    ];

    // Age Group 23-50
    const questions23_50 = [
      {
        id: 1,
        question: "How often do you feel stressed about work deadlines?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 2,
        question: "Do you feel overwhelmed by work-life balance?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 3,
        question: "How often do you feel pressure from career advancement?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 4,
        question: "Do you worry about financial responsibilities?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 5,
        question: "How often do you feel stressed about family obligations?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 6,
        question: "How often do you find yourself worrying about things that might happen in the future?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 7,
        question: "Do you have difficulty controlling your worries?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 8,
        question: "Do you feel guilty or anxious about not spending enough time with your family?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 9,
        question: "Do you find it hard to concentrate or focus on tasks?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 10,
        question: "Do you feel pressure to meet societal expectations related to family and career?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 11,
        question: "Do you worry excessively about the well-being of your family members?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 12,
        question: "Do you experience anxiety related to financial pressures or job security?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      }
      // Add more questions here for the 23-50 age group
    ];

    // Age Group 51+
    const questions51_plus = [
      {
        id: 1,
        question: "Feeling nervous, anxious, or on edge?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 2,
        question: "Feeling vain about the future?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 3,
        question: "Difficulty sleeping or staying asleep?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 4,
        question: "Feeling tired or having little energy",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 5,
        question: "Feeling irritable or restless?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 6,
        question: "Feeling hopeless about the future?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 7,
        question: "Do you feel isolated or lonely?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 8,
        question: "Do you feel a loss of purpose or meaning in your life?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 9,
        question: "Do you find it difficult to adjust to changes in your life, such as retirement or loss of loved ones?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 10,
        question: "Do you feel anxious about your health or the health of loved ones?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 11,
        question: "Do you experience anxiety related to financial pressures or managing retirement funds?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 12,
        question: "Do you worry excessively about the well-being of your family members?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      }       
    ]

    // Function to insert questions and options
    async function insertQuestions(questions, ageGroup) {
      for (const q of questions) {
        // Insert the question into the stress_questions table
        const questionResult = await pool.query(
          'INSERT INTO stress_questions (question_text, age_group) VALUES ($1, $2) RETURNING q_id',
          [q.question, ageGroup]
        );
        const questionId = questionResult.rows[0].q_id;

        // Insert the options into the stress_question_options table
        for (const option of q.options) {
          await pool.query(
            'INSERT INTO stress_question_options (question_id, option, weightage) VALUES ($1, $2, $3)',
            [questionId, option, 1] // You can adjust the weightage as needed
          );
        }
      }
    }

    // Insert questions for each age group
    await insertQuestions(questions5_16, '5-16');
    await insertQuestions(questions17_22, '17-22');
    await insertQuestions(questions23_50, '23-50');
    await insertQuestions(questions51_plus, '51+');

    console.log('Questions and options populated successfully!');
  } catch (err) {
    console.error('Error populating questions:', err);
  } finally {
    pool.end(); // Close the connection pool
  }
}

populateQuestions();