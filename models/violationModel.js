const db = require('./db');

class Violation {
    static async getAllViolations(search = '') {
        let query = 'SELECT v.*, u.name FROM violations v JOIN users u ON v.user_id = u.id';
        let params = [];

        if (search) {
            query += ' WHERE u.name LIKE ? OR v.violation_type LIKE ? OR v.status LIKE ?';
            params = [`%${search}%`, `%${search}%`, `%${search}%`];
        }

        const [rows] = await db.query(query, params);
        return rows;
    }

    static async getUserViolations(userId) {
        const [rows] = await db.query(
            'SELECT * FROM violations WHERE user_id = ?',
            [userId]
        );
        return rows;
    }

    static async addViolation(userId, violationType, specificViolation, location, details) {
        const [result] = await db.query(
            'INSERT INTO violations (user_id, violation_type, specific_violation, location, details) VALUES (?, ?, ?, ?, ?)',
            [userId, violationType, specificViolation, location, details]
        );
        return result.insertId;
    }

    static async updateViolationStatus(violationId, status) {
        await db.query(
            'UPDATE violations SET status = ? WHERE id = ?',
            [status, violationId]
        );
    }

    static async getAllUsers() {
        const [rows] = await db.query('SELECT id, name FROM users');
        return rows;
    }
}

module.exports = Violation;