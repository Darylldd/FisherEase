// controllers/enforcementComplianceController.js

const enforcementComplianceModel = require('../models/enforcementComplianceModel');

function enforcementComplianceLogging(req, res) {
  const filters = {
    incident: req.query.incident || "",
    violation: req.query.violation || "",
    date: req.query.date || "",
  };

  const sortBy = req.query.sortBy || null;
  const logs = enforcementComplianceModel.getEnforcementLogs(filters, sortBy);

  // Provide a default user object to avoid "user is not defined" error in the view
  const user = req.user || { name: 'Admin' };

  res.render('enforcementCompliance', { logs, filters, sortBy, user });
}

module.exports = {
  enforcementComplianceLogging,
};
