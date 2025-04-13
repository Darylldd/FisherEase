
const Violation = require('../models/violationModel');

exports.getViolations = async (req, res) => {
    try {
        const violations = await Violation.getAllViolations(); // Fetch violations
        const user = req.user || { name: 'Guest' };

        res.render('violations', { violations, user });
    } catch (error) {
        console.error('Error fetching violations:', error);
        res.status(500).send('Error fetching violations');
    }
};


exports.addViolation = async (req, res) => {
    const { user_id, violation_type, details } = req.body;
    try {
        await Violation.addViolation(user_id, violation_type, details);
        res.redirect('/violation-notifications');
    } catch (error) {
        res.status(500).send('Error adding violation');
    }
};

exports.updateViolation = async (req, res) => {
    const { id, status } = req.body;
    try {
        await Violation.updateViolationStatus(id, status);
        res.redirect('/violation-notifications');
    } catch (error) {
        res.status(500).send('Error updating violation');
    }
};

exports.getUserViolations = async (req, res) => {
    try {
        // Check if user is logged in (req.session.userId should exist)
        if (!req.session.userId) {
            return res.redirect('/auth/login');
        }

        const userId = req.session.userId; // Use session ID instead of req.user.id
        const user = req.session.user || { name: 'Guest' }; // Fallback if user data is missing
        const violations = await Violation.getUserViolations(userId);

        res.render('violation-history', { violations, user });
    } catch (error) {
        console.error('Error fetching user violations:', error);
        res.status(500).send('Error fetching violation history');
    }
};