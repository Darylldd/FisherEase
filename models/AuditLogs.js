// models/AuditLogs.js
const pool = require('./db');

class AuditLog {
  static async getAllLogs() {
    try {
      const result = await pool.query('SELECT * FROM audit_logs ORDER BY timestamp DESC');
      return result.rows;
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      throw err;
    }
  }

  static async logActivity(userId, userEmail, action) {
    try {
      await pool.query(
        'INSERT INTO audit_logs (user_id, email, action, timestamp) VALUES ($1, $2, $3, NOW())',
        [userId, userEmail, action]
      );
    } catch (err) {
      console.error('Error logging user activity:', err);
      throw err;
    }
  }
}

module.exports = AuditLog;
