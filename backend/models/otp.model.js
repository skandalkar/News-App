// models/otpModel.js
const mongoose = require('mongoose');
const mailSender = require('../utilities/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h3>Please confirm your OTP</h3>
            <p>Here is your OTP code: ${otp}</p>
            <h4>This is sent by Krishi Unnati Project developed by PRMCEAM's Team</h4>
            <h5>Do not share this code with anyone.</h5>`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}
otpSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});
module.exports = mongoose.model("OTP", otpSchema);