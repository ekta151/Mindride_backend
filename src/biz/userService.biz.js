const { Client } = require('pg');
const bcrypt = require('bcryptjs');

// Create database client
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mindride',
    password: 'ekta',
    port: 5432,
});

// Connect to database
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

class UserService {
    constructor() {
        this.dbClient = client; // Store client reference
    }

    async getUserByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const { rows } = await this.dbClient.query(query, [email]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Database error while fetching user');
        }
    }

    async comparePasswords(enteredPassword, storedPassword) {
        try {
            return await bcrypt.compare(enteredPassword, storedPassword);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            throw new Error('Error during password comparison');
        }
    }

    async createUser(email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email';
            const { rows } = await this.dbClient.query(query, [email, hashedPassword]);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            if (error.code === '23505') { // PostgreSQL unique violation error code
                throw new Error('Email already registered');
            }
            throw new Error('Database error while creating user');
        }
    }

    async getUserById(userId) {
        try {
            const query = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await this.dbClient.query(query, [userId]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error fetching user by id:', error);
            throw new Error('Database error while fetching user');
        }
    }
}

// Export a single instance
module.exports = new UserService();