const db = require('./db');

class Violation {
    static async getAllViolations(search = '', month = '', year = '') {
        let query = `
            SELECT v.id, 
                   COALESCE(CONCAT(f.first_name, ' ', f.middle_name, ' ', f.last_name), u.name) AS name,
                   CASE 
                       WHEN f.id IS NOT NULL THEN 'Fisherfolk'
                       ELSE 'User'
                   END AS type,
                   v.violation_type, v.specific_violation, v.location, v.fines, v.details, 
                   v.status, v.created_at
            FROM violations v
            LEFT JOIN users u ON v.user_id = u.id
            LEFT JOIN fisherfolk f ON v.user_id = f.id
            WHERE (COALESCE(CONCAT(f.first_name, ' ', f.middle_name, ' ', f.last_name), u.name) LIKE ?
                   OR v.violation_type LIKE ? OR v.status LIKE ?)
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

    static async getAllCombinedNames() {
        try {
            const [users] = await db.query('SELECT id, name, "User" AS type FROM users');
            const [fisherfolk] = await db.query(`
                SELECT id, CONCAT(first_name, ' ', middle_name, ' ', last_name) AS name, 
                       "Fisherfolk" AS type 
                FROM fisherfolk
            `);
            return [...users, ...fisherfolk];
        } catch (error) {
            throw error;
        }
    }

    static async addViolation(user_id, fisherfolk_id, violation_type, specific_violation, location, fines, details) {
        try {
            await db.query(
                `INSERT INTO violations 
                 (user_id, fisherfolk_id, violation_type, specific_violation, location, fines, details, status, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())`,
                [user_id, fisherfolk_id || null, violation_type, specific_violation, location, parseFloat(fines), details]
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
                `SELECT v.id, 
                        COALESCE(CONCAT(f.first_name, ' ', f.middle_name, ' ', f.last_name), u.name) AS name,
                        CASE 
                            WHEN f.id IS NOT NULL THEN 'Fisherfolk'
                            ELSE 'User'
                        END AS type,
                        v.violation_type, v.specific_violation, v.location, v.fines, v.details, 
                        v.status, v.created_at 
                 FROM violations v 
                 LEFT JOIN users u ON v.user_id = u.id 
                 LEFT JOIN fisherfolk f ON v.user_id = f.id 
                 WHERE v.user_id = ?`,
                [userId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getViolationAnalytics() {
        try {
            const [rows] = await db.query(
                `SELECT violation_type, COUNT(*) as count 
                 FROM violations 
                 GROUP BY violation_type`
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getTotalViolations() {
        try {
            const [rows] = await db.query('SELECT COUNT(*) as count FROM violations');
            return rows[0].count;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Violation;