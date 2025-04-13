const pool = require('./db');

class AuditLog {
    static async getAllLogs() {
        try {
            const [rows] = await pool.execute('SELECT * FROM audit_logs ORDER BY timestamp DESC');
            return rows;
        } catch (err) {
            console.error('Error fetching audit logs:', err);
            throw err;
        }
    }

    static async logActivity(userId, userEmail, action) {
        try {
            await pool.execute(
                'INSERT INTO audit_logs (user_id, email, action, timestamp) VALUES (?, ?, ?, NOW())',
                [userId, userEmail, action]
            );
        } catch (err) {
            console.error("Error logging user activity:", err);
        }
    }
}

module.exports = AuditLog;
