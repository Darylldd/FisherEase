const enforcementComplianceModel = require('../models/enforcementComplianceModel');

async function enforcementComplianceLogging(req, res) {
  try {
    const filters = {
      incident: req.query.incident || "",
      violation: req.query.violation || "",
      date: req.query.date || "",
    };

    const sortBy = req.query.sortBy || null;
    const logs = await enforcementComplianceModel.getEnforcementLogs(filters, sortBy); // Added await

    const user = req.user || { name: 'Admin' };

    res.render('enforcementCompliance', { logs, filters, sortBy, user });
  } catch (error) {
    console.error('Error fetching enforcement logs:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  enforcementComplianceLogging,
};