const express = require('express');
const router = express.Router();
//controller for OTP
const controllerOTP = require('../controllers/OTP.controller');

// Send OTP route
router.post('/send', controllerOTP.sendOTP);

// Verify OTP route
router.post('/verify', controllerOTP.verifyOTP);

// Resend OTP route
router.post('/resend', controllerOTP.resendOTP);

module.exports = router;