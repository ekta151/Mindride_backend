const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mindride',
    password: 'ekta',
    port: 5432,
});

class StressQuestion {
    constructor(q_id, question_text, age_group, options) {
        this.q_id = q_id;
        this.question_text = question_text;
        this.age_group = age_group;
        this.options = options;
    }

    static async findByAgeGroup(ageGroup) {
        try {
            const result = await pool.query(
                `select sq.q_id, sq.question_text, sq.age_group, JSON_AGG(json_build_object('option', sqo.option, 'weightage',sqo.weightage))
                from stress_questions sq 
                left join stress_question_options sqo on sq.q_id = sqo.question_id
                where sq.age_group = $1
                group by sq.q_id, sq.question_text, sq.age_group`,
                [ageGroup]
            );

            if (result.rows.length === 0) {
                return [];
            }

            const questions = result.rows.map(row => new StressQuestion(
                row.q_id,
                row.question_text,
                row.age_group
            ));

            // Fetch options for each question
            for (const question of questions) {
                const optionsResult = await pool.query(
                    'SELECT option FROM stress_question_options WHERE question_id = $1',
                    [question.q_id]
                );
                question.options = optionsResult.rows.map(row => row.option);
            }

            return questions;
        } catch (error) {
            console.error('Error fetching stress questions by age group:', error);
            throw error;
        }
    }

    static async create(questionText, ageGroup) {
        try {
            const result = await pool.query(
                'INSERT INTO stress_questions (question_text, age_group) VALUES ($1, $2) RETURNING q_id, question_text, age_group',
                [questionText, ageGroup]
            );
            const newQuestion = result.rows[0];
            return new StressQuestion(newQuestion.q_id, newQuestion.question_text, newQuestion.age_group);
        } catch (error) {
            console.error('Error creating stress question:', error);
            throw error;
        }
    }
}

module.exports = StressQuestion;