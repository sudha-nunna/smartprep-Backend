const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Route for user registration
router.post('/register', authController.register);

// Route for getting all users
// router.get('/users', authController.getAllUsers);

// Route for user login
router.post('/login', authController.loginUser);

// Route for sending a password reset link
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;