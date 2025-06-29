const db = require('./db'); // Import PostgreSQL DB connection (e.g., node-postgres)

class Violation {
  static async getAllViolations(search = '') {
    try {
      let query = 'SELECT v.*, u.name FROM violations v JOIN users u ON v.user_id = u.id';
      let params = [];

      if (search) {
        query += ' WHERE u.name ILIKE $1 OR v.violation_type ILIKE $2 OR v.status ILIKE $3';
        params = [`%${search}%`, `%${search}%`, `%${search}%`];
      }

      const { rows } = await db.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching violations:', error);
      throw error;
    }
  }

  static async getUserViolations(userId) {
    try {
      const { rows } = await db.query(
        'SELECT * FROM violations WHERE user_id = $1',
        [userId]
      );
      return rows;
    } catch (error) {
      console.error('Error fetching user violations:', error);
      throw error;
    }
  }

  static async addViolation(userId, violationType, specificViolation, location, details) {
    try {
      const query = `
        INSERT INTO violations (user_id, violation_type, specific_violation, location, details)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      const values = [userId, violationType, specificViolation, location, details];
      const { rows } = await db.query(query, values);
      return rows[0].id;
    } catch (error) {
      console.error('Error adding violation:', error);
      throw error;
    }
  }

  static async updateViolationStatus(violationId, status) {
    try {
      const query = 'UPDATE violations SET status = $1 WHERE id = $2';
      await db.query(query, [status, violationId]);
    } catch (error) {
      console.error('Error updating violation status:', error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const { rows } = await db.query('SELECT id, name FROM users');
      return rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}

module.exports = Violation;