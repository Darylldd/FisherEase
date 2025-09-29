const pool = require('../models/db');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const auditController = require('./auditController');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY); // put your API key in Render env

// GET /auth/login
exports.getLogin = (req, res) => {
    res.render('login', { title: 'Log In' });
};

// POST /auth/login
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            req.flash('error_msg', 'User not found.');
            return res.redirect('/auth/login');
        }
        const user = rows[0];

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

        return res.redirect(user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
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
        await pool.execute(
            'INSERT INTO users (name, email, password, role, is_verified, verification_token) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, role, false, verificationToken]
        );

        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const verificationLink = `${baseUrl}/auth/verify-email?token=${verificationToken}&email=${email}`;

        // Send verification email with Resend
        await resend.emails.send({
            from: "FMO Support <onboarding@resend.dev>",
            to: email,
            subject: "Verify Your Email - FMO",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Welcome to FMO, ${name}!</h2>
                    <p>Thank you for signing up. To complete your registration, please verify your email address.</p>
                    <p>
                        <a href="${verificationLink}"
                           style="background: #28a745; color: #fff; padding: 10px 20px;
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                           Verify Email
                        </a>
                    </p>
                    <p>This link will expire in 24 hours. If you did not create this account, please ignore this email.</p>
                    <p>— The FMO Team</p>
                </div>
            `
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
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND verification_token = ?',
            [email, token]
        );
        if (rows.length === 0) {
            req.flash('error_msg', 'Invalid token or email.');
            return res.redirect('/auth/login');
        }

        await pool.execute(
            'UPDATE users SET is_verified = ?, verification_token = NULL WHERE email = ?',
            [true, email]
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
    
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            req.flash('error_msg', 'No user with that email.');
            return res.redirect('/auth/forgot-password');
        }

        const expiry = Date.now() + 3600000; // Token valid for 1 hour
        await pool.execute(
            'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
            [resetToken, expiry, email]
        );

        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const resetLink = `${baseUrl}/auth/reset-password?token=${resetToken}&email=${email}`;

        // Send reset email with Resend
        await resend.emails.send({
            from: "FMO Support <onboarding@resend.dev>",
            to: email,
            subject: "Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password for your <strong>FMO</strong> account.</p>
                    <p>Click the button below to reset your password:</p>
                    <p>
                        <a href="${resetLink}" 
                           style="background: #007BFF; color: #fff; padding: 10px 20px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                           Reset Password
                        </a>
                    </p>
                    <p>This link will expire in 1 hour. If you did not request this, you can safely ignore this email.</p>
                    <p>— The FMO Team</p>
                </div>
            `
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
