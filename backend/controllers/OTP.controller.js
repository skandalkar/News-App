const generatorOTP = require('otp-generator');
const otpSchema = require('../models/OTP.model');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const RESEND_COOLDOWN_SECONDS = 60;
const OTP_GENERATOR_OPTIONS = {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
};

const getRemainingCooldown = (createdAt) => {
    const elapsedSeconds = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
    return Math.max(RESEND_COOLDOWN_SECONDS - elapsedSeconds, 0);
};
const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

// Internal function for generating and saving OTP
const generateAndSaveOTP = async (email) => {
    const normalizedEmail = normalizeEmail(email);
    let otp = generatorOTP.generate(6, OTP_GENERATOR_OPTIONS);

    let result = await otpSchema.findOne({ otp: otp });
    while (result) {
        otp = generatorOTP.generate(6, OTP_GENERATOR_OPTIONS);
        result = await otpSchema.findOne({ otp: otp });
    }

    // Delete any existing OTP for this email
    await otpSchema.deleteMany({ email: normalizedEmail });

    const otpPayload = { email: normalizedEmail, otp };
    await otpSchema.create(otpPayload);
    return otp;
};

// Send OTP
const sendOTP = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        let otp = generatorOTP.generate(6, OTP_GENERATOR_OPTIONS);

        let result = await otpSchema.findOne({ otp: otp });
        while (result) {
            otp = generatorOTP.generate(6, OTP_GENERATOR_OPTIONS);
            result = await otpSchema.findOne({ otp: otp });
        }

        // Delete any existing OTP for this email
        await otpSchema.deleteMany({ email });

        const otpPayload = { email, otp };
        await otpSchema.create(otpPayload);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            resendAfter: RESEND_COOLDOWN_SECONDS,
            otp: otp // In production, remove this line and only send OTP via email
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is required"
            });
        }

        // Find the OTP record
        const otpRecord = await otpSchema.findOne({
            otp,
            ...(email ? { email } : {})
        });

        // If OTP doesn't exist or has expired (MongoDB TTL will handle expiration)
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "OTP is invalid or has expired"
            });
        }

        // Delete the OTP record so it cannot be reused
        await otpSchema.deleteOne({ _id: otpRecord._id });

        // Find the user by email
        const user = await User.findOne({ email: otpRecord.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            token: token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Resend OTP
const resendOTP = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const existingOtp = await otpSchema.findOne({ email }).sort({ createdAt: -1 });
        if (existingOtp) {
            const retryAfter = getRemainingCooldown(existingOtp.createdAt);
            if (retryAfter > 0) {
                return res.status(429).json({
                    success: false,
                    message: `Please wait ${retryAfter} seconds before requesting another OTP`,
                    retryAfter
                });
            }
        }

        const otp = await generateAndSaveOTP(email);

        return res.status(200).json({
            success: true,
            message: "OTP resent successfully",
            resendAfter: RESEND_COOLDOWN_SECONDS,
            otp: otp // In production, remove this line and only send OTP via email
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { sendOTP, verifyOTP, generateAndSaveOTP, resendOTP };
