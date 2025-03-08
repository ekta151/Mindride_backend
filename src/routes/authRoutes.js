const express = require('express');
const app = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
// Auth routes
app.post('/login', authController.login);
app.post('/register', authController.register);


// Example protected route
app.get('/protected', 
    verifyToken, 
    (req, res) => {
        res.json({ message: 'Access granted', user: req.user });
    }
);

// Dashboard route (protected)
app.get('/dashboard', 
    verifyToken, 
    authController.getDashboard
);

module.exports = app;