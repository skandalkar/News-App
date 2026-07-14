const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const otpSchema = require('../models/OTP.model');
const User = require('../models/User.model');
const { generateAndSaveOTP } = require('../controllers/OTP.controller');
const { generateToken } = require('../utils/GenerateToken')

const allowedCountries = ['in', 'us', 'gb', 'cn', 'ru'];
const RESEND_COOLDOWN_SECONDS = 60;
const normalizeCountry = (country) =>
    allowedCountries.includes(String(country || '').toLowerCase())
        ? String(country).toLowerCase()
        : 'in';

/**
 * @desc    Signup a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */

let otp, emailForValidationArg;

// Signup or Registration functionality with OTP send on Email
const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const country = normalizeCountry(req.body.country || req.body.locationPreference);

        // 1. Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // 2. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Generate OTP and save to DB along with handle error if 
        try {
            otp = await generateAndSaveOTP(email);
        } catch (errorOTP) {
            return res.status(400).json({ message: errorOTP.message });
        }

        // 5. Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            country,
        });

        if (user) {
            res.status(201).json({
                message: 'User registered successfully and OTP sent to email.',
                _id: user.id,
                name: user.name,
                email: user.email,
                country: user.country,
                token: generateToken(user._id),
                resendAfter: RESEND_COOLDOWN_SECONDS,
                otp: otp
            });

        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Authenticate a user (Login)
 * @route   POST /api/v1/auth/login
 * @access  Public
 */

// Login functionality with OTP send on Email
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const country = normalizeCountry(req.body.country || req.body.locationPreference);

        emailForValidationArg = email;

        // 1. Check for user email AND explicitly select the hidden password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // 2. Check if user exists and password matches

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        if (user.country !== country) {
            user.country = country;
            await user.save();
        }

        // 1. Generate the JWT token using the user's ID
        const token = generateToken({ id: user._id });

        const userToReturn = {
            _id: user._id,
            name: user.name,
            email: user.email,
            country: user.country
        };

        try {
            otp = await generateAndSaveOTP(email);
        } catch (errorOTP) {
            return res.status(400).json({ message: errorOTP.message });
        }

        res.json({
            message: 'Login successful and OTP sent to email.',
            token: token,
            user: userToReturn,
            resendAfter: RESEND_COOLDOWN_SECONDS,
            otp: otp
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Authenticate a user (Login)
 * @route   POST /api/v1/otp/verify
 * @access  defuault-Private
 */

// Verify OTP
const validateOTP = async (req, res) => {
    try {
        const { otp } = req.body;

        // Find the OTP record
        const otpRecord = await otpSchema.findOne({ otp });

        // If OTP doesn't exist or has expired (MongoDB TTL will handle expiration)
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "OTP is invalid or has expired"
            });
        }

        // If OTP exists and is valid, delete it so it cannot be reused
        await otpSchema.deleteOne({ _id: otpRecord._id });

        // Return success response
        res.status(200).json({
            success: true,
            message: "OTP verification successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = { signUpUser, signInUser, validateOTP };
