const EnforcementComplianceModel = require('../models/enforcementComplianceModel');

     async function enforcementComplianceLogging(req, res) {
       try {
         const filters = {
           incident: req.query.incident || '',
           violation: req.query.violation || '',
           date: req.query.date || '',
         };

         const sortBy = req.query.sortBy || null;
         const logs = await EnforcementComplianceModel.getEnforcementLogs(filters, sortBy);

         // Provide a default user object to avoid "user is not defined" error
         const user = req.user || { name: 'Admin' };

         res.render('enforcementCompliance', { logs, filters, sortBy, user });
       } catch (error) {
         console.error('Error fetching enforcement logs:', error);
         res.status(500).render('enforcementCompliance', {
           logs: [],
           filters: { incident: '', violation: '', date: '' },
           sortBy: null,
           user: req.user || { name: 'Admin' },
           error: 'An error occurred while fetching logs.'
         });
       }
     }

     module.exports = {
       enforcementComplianceLogging,
     };