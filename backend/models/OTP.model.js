const mongoose = require('mongoose');
const mailSender = require('../utils/MailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: true,
        match: [/^\d{6}$/, 'OTP must be exactly 6 digits']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 1 // Auto-deletes document after 1 minutes (60 seconds)
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email", // mail subject
            `
        <h2>Please confirm your OTP</h2>
        <p>Here is your OTP code: <b>${otp}</b></p>
        <h4>This is sent by Briefly - Your Daily News Digest</h4>
        <h5>⚠️ Do not share this code with anyone.</h5>
        <hr/>
        <p style="color:gray; font-size:12px;">
          This is an <b>auto-generated email</b> from 
          <i>viatelligence.app@gmail.com</i>. <br/>
          Please do not reply or forward this email.
        </p>
        `
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    // console.log("New document saved to the database");
    // Only send an email when a new document is created means new user created account
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model('Otp', otpSchema);