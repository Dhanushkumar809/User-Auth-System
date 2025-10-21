// backend/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Used for generating secure reset tokens
const sendEmail = require('../utils/sendEmail'); // Import the email utility

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = await User.create({ name, email, password });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: 'Registration successful',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials (Email or Password)' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- NEW PASSWORD RESET LOGIC ---

// Helper function to generate token and hash it
function getResetPasswordToken() {
    // Generate a secure random token (e.g., 32 hex characters)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the token and save it to the database for security comparison
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Return both the plain token (to send in the email) and the hashed version
    return { resetToken, resetPasswordToken };
}

// @desc    Send reset password email
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // Send a 200 OK even if the user is not found to prevent email enumeration attacks
            return res.status(200).json({ message: 'If a user exists with this email, a reset link has been sent.' });
        }
        
        // 1. Generate the reset token (hashed and plain)
        const { resetToken, resetPasswordToken } = getResetPasswordToken();

        // 2. Save the hashed token and expiration time to the user model
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour expiration
        await user.save({ validateBeforeSave: false }); // Bypass schema validation for this update

        // 3. Create the reset URL using the plain token
        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password:</p>
            <a href="${resetURL}" clicktracking=off>${resetURL}</a>
            <p>This link will expire in 1 hour.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message: message,
            });

            res.status(200).json({ success: true, message: 'Reset Email Sent' });

        } catch (error) {
            // If email sending fails, reset the user fields and report error
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            console.error(error);
            return res.status(500).json({ message: 'Email could not be sent. Server error.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset user password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res) => {
    // 1. Hash the incoming plain token from the URL params
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    
    // 2. Find the user based on the hashed token and check if the token is still valid
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }, // Token must be greater than current time
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token.' });
        }

        // 3. Set the new password (hashing happens automatically via the pre-save hook)
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        // 4. Respond with a new login token and success message
        res.status(200).json({
            success: true,
            message: 'Password successfully reset. You can now log in.',
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Placeholder for getting the authenticated user's profile
exports.getMe = (req, res) => {
    // Requires a "protect" middleware to be functional
    res.status(200).json({ message: 'User profile endpoint' });
};
