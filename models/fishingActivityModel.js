const pool = require('./db'); // Import PostgreSQL DB connection (e.g., node-postgres)

const FishingActivity = {
  getAll: async (filters = {}) => {
    try {
      let query = `SELECT * FROM fishing_activity WHERE 1=1`;
      let params = [];

      if (filters.date) {
        query += ` AND date = $1`;
        params.push(filters.date);
      }
      if (filters.location) {
        query += ` AND location ILIKE $${params.length + 1}`;
        params.push(`%${filters.location}%`);
      }
      if (filters.method) {
        query += ` AND method ILIKE $${params.length + 1}`;
        params.push(`%${filters.method}%`);
      }

      // Sorting
      if (filters.sortBy) {
        query += ` ORDER BY ${filters.sortBy} ASC`;
      } else {
        query += ` ORDER BY date DESC`;
      }

      const { rows } = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching fishing activities:', error);
      throw error;
    }
  },

  addActivity: async (data) => {
    try {
      const query = `
        INSERT INTO fishing_activity (date, start_time, end_time, location, method, weather)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const values = [data.date, data.start_time, data.end_time, data.location, data.method, data.weather];

      const { rows } = await pool.query(query, values);
      return rows[0].id;
    } catch (error) {
      console.error('Error adding fishing activity:', error);
      throw error;
    }
  }
};

module.exports = FishingActivity;