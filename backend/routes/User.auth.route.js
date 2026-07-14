// This file defines the routes for user authentication, including signup and login functionalities.

const express = require('express');
const router = express.Router();

const authController = require('../controllers/User.auth.controller');

// Signup route
router.post('/signup', authController.signUpUser);

// Login route
router.post('/login', authController.signInUser);

// OTP verification route
router.post('/verify-otp', authController.validateOTP);

module.exports = router;