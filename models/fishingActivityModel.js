const pool = require('./db'); 

const FishingActivity = {

  getAll: async (filters = {}) => {
    try {
      let query = `SELECT * FROM fishing_activity WHERE 1`;
      let params = [];

      if (filters.date) {
        query += ` AND date = ?`;
        params.push(filters.date);
      }
      if (filters.location) {
        query += ` AND location LIKE ?`;
        params.push(`%${filters.location}%`);
      }
      if (filters.method) {
        query += ` AND method LIKE ?`;
        params.push(`%${filters.method}%`);
      }

      // Sorting
      if (filters.sortBy) {
        query += ` ORDER BY ${filters.sortBy} ASC`;
      } else {
        query += ` ORDER BY date DESC`;
      }

      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching fishing activities:', error);
      throw error;
    }
  },

  // Add new fishing activity
  addActivity: async (data) => {
    try {
      const query = `
          INSERT INTO fishing_activity (date, start_time, end_time, location, method, weather)
    VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [data.date, data.start_time, data.end_time, data.location, data.method, data.weather];

      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error('Error adding fishing activity:', error);
      throw error;
    }
  }
};

module.exports = FishingActivity;
