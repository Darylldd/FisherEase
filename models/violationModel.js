const db = require('./db');

class Violation {
    static async getAllViolations(search = '', month = '', year = '') {
        let query = `
            SELECT v.id, u.name, v.violation_type, v.specific_violation, v.location, v.details, v.status, v.created_at
            FROM violations v
            JOIN users u ON v.user_id = u.id
            WHERE (u.name LIKE ? OR v.violation_type LIKE ? OR v.status LIKE ?)
        `;
        const queryParams = [`%${search}%`, `%${search}%`, `%${search}%`];

        if (month) {
            query += ' AND MONTH(v.created_at) = ?';
            queryParams.push(parseInt(month));
        }
        if (year) {
            query += ' AND YEAR(v.created_at) = ?';
            queryParams.push(parseInt(year));
        }

        try {
            const [rows] = await db.query(query, queryParams);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            const [rows] = await db.query('SELECT id, name FROM users');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async addViolation(user_id, violation_type, specific_violation, location, details) {
        try {
            await db.query(
                'INSERT INTO violations (user_id, violation_type, specific_violation, location, details, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                [user_id, violation_type, specific_violation, location, details, 'Pending']
            );
        } catch (error) {
            throw error;
        }
    }

    static async updateViolationStatus(id, status) {
        try {
            await db.query('UPDATE violations SET status = ? WHERE id = ?', [status, id]);
        } catch (error) {
            throw error;
        }
    }

    static async getUserViolations(userId) {
        try {
            const [rows] = await db.query(
                'SELECT v.id, u.name, v.violation_type, v.specific_violation, v.location, v.details, v.status, v.created_at ' +
                'FROM violations v JOIN users u ON v.user_id = u.id WHERE v.user_id = ?',
                [userId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Violation;