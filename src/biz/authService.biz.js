const UserService = require('./userService.biz');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {verifyToken}  = require('../middleware/authMiddleware');


class AuthService {
    constructor(userService) {
        this.userService = userService;
        this.verifyToken=verifyToken
    }

    validateInput(email, password) {
        if (!email ||!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }
        if (!password || password.length < 6) { 
            throw new Error('Password must be at least 6 characters');
        }
    }

    generateToken(userId) {
        return jwt.sign({ userId: userId }, 'inki pinki ponki', { expiresIn: '1h' });
    }


    async login(req, res) {
        try {
            console.log('received request');
            const { email, password } = req.body;

            this.validateInput(email, password);

            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await this.userService.comparePasswords(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = this.generateToken(user.id);

            res.status(200).json({ message: 'Login successful', token });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }

        
    }

    async register(req, res) {
        try {
            const { email, password } = req.body;
            
            // Validate input
            this.validateInput(email, password);

            // Check if user already exists
            const existingUser = await this.userService.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Create new user
            const newUser = await this.userService.createUser(email, password);

            // Generate token
            const token = this.generateToken(newUser.id);

            // Send response
            res.status(201).json({
                message: 'Registration successful',
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            if (error.message.includes('Email already registered')) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes('Invalid')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getDashboard(req, res) {
        try {
            
            const user = await this.userService.getUserById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Return dashboard data
            res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    // Add any other non-sensitive user data you want to display
                },
                dashboardData: {
                    lastLogin: new Date(),
                    // Add other dashboard-specific data here
                }
            });
        } catch (error) {
            console.error('Dashboard error:', error);
            if (error.message === 'Invalid token') {
                return res.status(401).json({ message: 'Invalid token' });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
    


 module.exports =new AuthService(UserService);