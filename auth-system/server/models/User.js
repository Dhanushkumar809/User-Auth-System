// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Must be installed: npm install bcryptjs

// Define the User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        // Added basic email validation using regex
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        // CRITICAL: Prevents the password hash from being returned by default in queries
        select: false, 
    },
    // Fields for the Forgot/Reset Password flow
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true 
});

// --- Mongoose Middleware: Hash Password Before Save (Security Step) ---
UserSchema.pre('save', async function (next) {
    // Only run this function if the password was actually modified (e.g., during registration or reset)
    if (!this.isModified('password')) {
        return next();
    }
    
    // Hash password with a salt factor of 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- Mongoose Instance Method: Compare Password for Login ---
// This method is used in authController.js to verify the user's credentials
UserSchema.methods.matchPassword = async function (enteredPassword) {
    // bcrypt compares the plain text password against the stored hash
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);
