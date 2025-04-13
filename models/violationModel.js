const db = require('./db');

class Violation {
    static async getAllViolations() {
        const [rows] = await db.query(
            'SELECT v.*, u.name FROM violations v JOIN users u ON v.user_id = u.id'
        );
        return rows;
    }

    static async getUserViolations(userId) {
        const [rows] = await db.query(
            'SELECT * FROM violations WHERE user_id = ?',
            [userId]
        );
        return rows;
    }

    static async addViolation(userId, violationType, details) {
        const [result] = await db.query(
            'INSERT INTO violations (user_id, violation_type, details) VALUES (?, ?, ?)',
            [userId, violationType, details]
        );
        return result.insertId;
    }

    static async updateViolationStatus(violationId, status) {
        await db.query(
            'UPDATE violations SET status = ? WHERE id = ?',
            [status, violationId]
        );
    }
}

module.exports = Violation;