const pool = require('./db');

const FishingActivity = {
  // USER: Only gets their own activities
  getAll: async (filters = {}, userId) => {
    try {
      let query = `
        SELECT fa.*, u.name AS submitted_by
        FROM fishing_activity fa
        JOIN users u ON fa.user_id = u.id
        WHERE fa.user_id = ?
      `;
      let params = [userId];

      if (filters.date) {
        query += ` AND fa.date = ?`;
        params.push(filters.date);
      }
      if (filters.location) {
        query += ` AND fa.location LIKE ?`;
        params.push(`%${filters.location}%`);
      }
      if (filters.method) {
        query += ` AND fa.method LIKE ?`;
        params.push(`%${filters.method}%`);
      }

      query += ` ORDER BY fa.${filters.sortBy || 'date'} DESC`;

      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching user fishing activities:', error);
      throw error;
    }
  },

  // ADMIN: Get All Activities With User Names
  getAllWithUserNames: async (filters = {}) => {
    try {
      let query = `
        SELECT fa.*, u.name AS submitted_by
        FROM fishing_activity fa
        JOIN users u ON fa.user_id = u.id
        WHERE 1 = 1
      `;
      let params = [];

      if (filters.date) {
        query += ` AND fa.date = ?`;
        params.push(filters.date);
      }
      if (filters.location) {
        query += ` AND fa.location LIKE ?`;
        params.push(`%${filters.location}%`);
      }
      if (filters.method) {
        query += ` AND fa.method LIKE ?`;
        params.push(`%${filters.method}%`);
      }

      query += ` ORDER BY fa.${filters.sortBy || 'date'} DESC`;

      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching all fishing activities for admin:', error);
      throw error;
    }
  },
getAllWithUserNamesByMonthYear: async ({ month, year }) => {
  try {
    let query = `
      SELECT fa.*, u.name AS submitted_by
      FROM fishing_activity fa
      JOIN users u ON fa.user_id = u.id
      WHERE 1 = 1
    `;
    const params = [];

    if (month) {
      const [y, m] = month.split("-");
      query += ` AND MONTH(fa.date) = ? AND YEAR(fa.date) = ?`;
      params.push(m, y);
    } else if (year) {
      query += ` AND YEAR(fa.date) = ?`;
      params.push(year);
    }

    query += ` ORDER BY fa.date DESC`;

    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error filtering export data:', error);
    throw error;
  }
},

  addActivity: async (data) => {
    try {
      const query = `
        INSERT INTO fishing_activity (user_id, date, start_time, end_time, location, method, weather)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        data.user_id,
        data.date,
        data.start_time,
        data.end_time,
        data.location,
        data.method,
        data.weather
      ];

      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error('Error adding fishing activity:', error);
      throw error;
    }
  }
};

module.exports = FishingActivity;
