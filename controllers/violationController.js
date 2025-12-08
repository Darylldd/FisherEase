const Violation = require('../models/violationModel');

exports.getViolations = async (req, res) => {
    try {
        const search = req.query.search || '';
        const month = req.query.month || '';
        const year = req.query.year || '';
        const violations = await Violation.getAllViolations(search, month, year);
        const combinedNames = await Violation.getAllCombinedNames();
        const user = req.session.user || req.user || { name: 'Guest' };

        // Use startsWith to handle query parameters in URL
        const template = req.originalUrl.startsWith('/violations-table') ? 'violations-table' : 'violations';
        res.render(template, { violations, user, search, combinedNames, month, year });
    } catch (error) {
        console.error('Error fetching violations or names:', error);
        res.status(500).send('Error fetching violations or names');
    }
};

exports.addViolation = async (req, res) => {
    const { entity_id, violation_type, specific_violation, location, fines, details } = req.body;
    try {
        let user_id = null;
        let fisherfolk_id = null;

        if (!entity_id) throw new Error('Please select a name.');

        const [type, id] = entity_id.split('-');
        const numericId = parseInt(id);
        if (!numericId) throw new Error('Invalid ID selected.');

        if (type === 'user') user_id = numericId;
        else if (type === 'fisherfolk') fisherfolk_id = numericId;
        else throw new Error('Invalid entity type.');

        await Violation.addViolation(
            user_id,
            fisherfolk_id,
            violation_type,
            specific_violation,
            location,
            fines,
            details
        );

        res.redirect('/violation-notifications');
    } catch (error) {
        console.error('Error adding violation:', error);
        res.status(500).send('Error adding violation: ' + error.message);
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

module.exports = exports;