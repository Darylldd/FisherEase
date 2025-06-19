const Violation = require('../models/violationModel');

exports.getViolations = async (req, res) => {
    try {
        const search = req.query.search || '';
        const violations = await Violation.getAllViolations(search);
        const user = req.user || { name: 'Guest' };

        res.render('violations', { violations, user, search });
    } catch (error) {
        console.error('Error fetching violations:', error);
        res.status(500).send('Error fetching violations');
    }
};

exports.addViolation = async (req, res) => {
    const { user_id, violation_type, specific_violation, location, details } = req.body;
    try {
        await Violation.addViolation(user_id, violation_type, specific_violation, location, details);
        res.redirect('/violation-notifications');
    } catch (error) {
        console.error('Error adding violation:', error);
        res.status(500).send('Error adding violation');
    }
};

exports.updateViolation = async (req, res) => {
    const { id, status } = req.body;
    try {
        await Violation.updateViolationStatus(id, status);
        res.redirect('/violation-notifications');
    } catch (error) {
        console.error('Error updating violation:', error);
        res.status(500).send('Error updating violation');
    }
};

exports.getUserViolations = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.redirect('/auth/login');
        }

        const userId = req.session.userId;
        const user = req.session.user || { name: 'Guest' };
        const violations = await Violation.getUserViolations(userId);

        res.render('violation-history', { violations, user });
    } catch (error) {
        console.error('Error fetching user violations:', error);
        res.status(500).send('Error fetching violation history');
    }
};