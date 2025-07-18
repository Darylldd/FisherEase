const pool = require('../models/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const auditController = require('./auditController');

// Render production domain (change if using custom domain)
const BASE_URL = process.env.BASE_URL || 'https://fisherease.onrender.com';

// Email transporter setup
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'calapancityfmo@gmail.com',
        pass: 'cvmv irvp jpdk gget' // Consider using environment variables here too
    }
});

// GET /auth/login
exports.getLogin = (req, res) => {
    res.render('login', { title: 'Log In' });
};

// POST /auth/login
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            req.flash('error_msg', 'User not found.');
            return res.redirect('/auth/login');
        }

        const user = result.rows[0];

        if (!user.is_verified) {
            req.flash('error_msg', 'Please verify your email before logging in.');
            return res.redirect('/auth/login');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.flash('error_msg', 'Incorrect password.');
            return res.redirect('/auth/login');
        }

        req.session.userId = user.id;
        req.session.role = user.role;
        req.session.user = { name: user.name, email: user.email };

        await auditController.logUserActivity(req, "Logged in");

        res.redirect(user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error logging in.');
        res.redirect('/auth/login');
    }
};

// GET /auth/signup
exports.getSignup = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};

// POST /auth/signup
exports.postSignup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    try {
        await pool.query(
            `INSERT INTO users (name, email, password, role, is_verified, verification_token) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [name, email, hashedPassword, role, false, verificationToken]
        );

        const verificationLink = `${BASE_URL}/auth/verify-email?token=${verificationToken}&email=${email}`;
        await transporter.sendMail({
            from: '"FMO" <no-reply@fmo.com>',
            to: email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: ${verificationLink}`
        });

        await auditController.logUserActivity(req, "Signed up");

        req.flash('success_msg', 'Signup successful. Please check your email to verify your account.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error during signup.');
        res.redirect('/auth/signup');
    }
};

// GET /auth/verify-email
exports.verifyEmail = async (req, res) => {
    const { token, email } = req.query;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND verification_token = $2',
            [email, token]
        );

        if (result.rows.length === 0) {
            req.flash('error_msg', 'Invalid token or email.');
            return res.redirect('/auth/login');
        }

        await pool.query(
            'UPDATE users SET is_verified = true, verification_token = NULL WHERE email = $1',
            [email]
        );

        await auditController.logUserActivity(req, "Verified email");

        req.flash('success_msg', 'Email verified successfully. You can now log in.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error verifying email.');
        res.redirect('/auth/login');
    }
};

// GET /auth/forgot-password
exports.getForgotPassword = (req, res) => {
    res.render('forgot-password', { title: 'Forgot Password' });
};

// POST /auth/forgot-password
exports.postForgotPassword = async (req, res) => {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            req.flash('error_msg', 'No user with that email.');
            return res.redirect('/auth/forgot-password');
        }

        await pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3',
            [resetToken, expiry, email]
        );

        const resetLink = `${BASE_URL}/auth/reset-password?token=${resetToken}&email=${email}`;
        await transporter.sendMail({
            from: '"FMO" <no-reply@fmo.com>',
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`
        });

        await auditController.logUserActivity(req, "Requested password reset");

        req.flash('success_msg', 'Password reset link sent. Please check your email.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error during password reset.');
        res.redirect('/auth/forgot-password');
    }
};

// GET /auth/reset-password
exports.getResetPassword = (req, res) => {
    const { token, email } = req.query;
    res.render('reset-password', { title: 'Reset Password', token, email });
};

// POST /auth/reset-password
exports.postResetPassword = async (req, res) => {
    const { token, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND reset_token = $2 AND reset_token_expiry > $3',
            [email, token, Date.now()]
        );

        if (result.rows.length === 0) {
            req.flash('error_msg', 'Invalid or expired token.');
            return res.redirect('/auth/forgot-password');
        }

        await pool.query(
            `UPDATE users 
             SET password = $1, reset_token = NULL, reset_token_expiry = NULL 
             WHERE email = $2`,
            [hashedPassword, email]
        );

        req.flash('success_msg', 'Password reset successfully. You can now log in.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error resetting password.');
        res.redirect('/auth/forgot-password');
    }
};

// GET /auth/logout
exports.logout = async (req, res) => {
    const userId = req.session.userId;
    if (userId) {
        await auditController.logUserActivity(req, "Logged out");
    }
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Server Error");
        }
        res.redirect('/');
    });
};
