const Violation = require('../models/violationModel');

exports.getViolations = async (req, res) => {
    try {
        const search = req.query.search || '';
        const month = req.query.month || '';
        const year = req.query.year || '';
        const violations = await Violation.getAllViolations(search, month, year);
        const users = await Violation.getAllUsers();
        const user = req.session.user || req.user || { name: 'Guest' };

        // Check the route to determine which template to render
        const template = req.originalUrl === '/violations-table' ? 'violations-table' : 'violations';
        res.render(template, { violations, user, search, users, month, year });
    } catch (error) {
        console.error('Error fetching violations or users:', error);
        res.status(500).send('Error fetching violations or users');
    }
};

exports.addViolation = async (req, res) => {
    const { user_id, violation_type, specific_violation, location, fines, details } = req.body;
    try {
        await Violation.addViolation(user_id, violation_type, specific_violation, location, fines, details);
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
        res.redirect('/violations-table');
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