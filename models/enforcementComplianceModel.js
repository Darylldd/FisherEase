// models/enforcementComplianceModel.js

const enforcementLogs = [
    { incident: "Incident #001", violation: "Overfishing", penalty: "Warning", date: "2025-02-10" },
    { incident: "Incident #002", violation: "Illegal netting", penalty: "Fine", date: "2025-02-12" },
    // ... more dummy data
  ];
  
  function getEnforcementLogs(filters, sortBy) {
    let results = [...enforcementLogs];
  
    // Filtering by incident, violation, and date
    if (filters) {
      if (filters.incident) {
        results = results.filter(log =>
          log.incident.toLowerCase().includes(filters.incident.toLowerCase())
        );
      }
      if (filters.violation) {
        results = results.filter(log =>
          log.violation.toLowerCase().includes(filters.violation.toLowerCase())
        );
      }
      if (filters.date) {
        results = results.filter(log => log.date === filters.date);
      }
    }
  
    // Sorting
    if (sortBy) {
      results.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }
  
    return results;
  }
  
  module.exports = {
    getEnforcementLogs,
  };
  