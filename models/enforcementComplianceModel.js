const db = require('./db'); // Import PostgreSQL DB connection (e.g., node-postgres)

async function getEnforcementLogs(filters, sortBy) {
  try {
    let query = 'SELECT * FROM enforcement_logs WHERE 1=1';
    let params = [];

    // Filtering by incident, violation, and date
    if (filters) {
      if (filters.incident) {
        query += ' AND incident ILIKE $1';
        params.push(`%${filters.incident}%`);
      }
      if (filters.violation) {
        query += ' AND violation ILIKE $2';
        params.push(`%${filters.violation}%`);
      }
      if (filters.date) {
        query += ' AND date = $3';
        params.push(filters.date);
      }
    }

    // Sorting
    if (sortBy) {
      query += ` ORDER BY ${sortBy} ASC`;
    }

    const { rows } = await db.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error fetching enforcement logs:', error);
    throw error;
  }
}

module.exports = {
  getEnforcementLogs,
};