const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true, // Automatically converts emails to lowercase to prevent duplicates (e.g., User@Bio.com -> user@bio.com)
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Excludes the password by default when querying users (great for security)
    },

    country: {
        type: String,
        enum: ['in', 'us', 'gb', 'cn', 'ru'],
        default: 'in',
        lowercase: true
    },

    // Automatically creates and manages 'createdAt' and 'updatedAt' fields
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date

});

// Auto-update updatedAt
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Remove sensitive fields automatically in API JSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.otp;
    return obj;
};


const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
