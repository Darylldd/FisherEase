const db = require('./db'); // Import your DB connection

class EnforcementComplianceModel {
  static async getEnforcementLogs(filters, sortBy) {
    let query = `
      SELECT 
        el.id,
        el.incident,
        el.violation,
        el.penalty,
        el.date,
        CONCAT(f.first_name, ' ', COALESCE(f.middle_name, ''), ' ', f.last_name) AS fisherfolk_name
      FROM enforcement_logs el
      JOIN fisherfolk f ON el.fisherfolk_id = f.id
      WHERE 1=1
    `;
    const values = [];

    // Apply filters
    if (filters.incident) {
      query += ' AND el.incident LIKE ?';
      values.push(`%${filters.incident}%`);
    }
    if (filters.violation) {
      query += ' AND el.violation LIKE ?';
      values.push(`%${filters.violation}%`);
    }
    if (filters.date) {
      query += ' AND el.date = ?';
      values.push(filters.date);
    }

    // Apply sorting
    if (sortBy) {
      const validSortColumns = ['incident', 'violation', 'date', 'fisherfolk_name'];
      if (validSortColumns.includes(sortBy)) {
        query += ` ORDER BY ${sortBy === 'fisherfolk_name' ? 'fisherfolk_name' : `el.${sortBy}`}`;
      }
    }

    try {
      // Use promise-based query for mysql2 or mysql with promisify
      const results = await db.query(query, values);
      // Handle mysql package result (returns rows directly) vs mysql2 (returns [rows, fields])
      const rows = Array.isArray(results) ? results[0] : results;
      return rows || [];
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
}

module.exports = EnforcementComplianceModel;