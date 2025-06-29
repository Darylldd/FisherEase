const db = require('./db'); // PostgreSQL connection pool
const localStorage = require('local-storage');

const CatchReport = {
  createReport: async (userId, species, quantity, location, method_of_fishing, status = "Under Review", date) => {
    const query = `
      INSERT INTO catch_reports (user_id, species, quantity, location, method_of_fishing, status, date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    return db.query(query, [userId, species, quantity, location, method_of_fishing, status, date]);
  },

  saveLocally: (report) => {
    const reports = localStorage.get('offlineReports') || [];
    reports.push(report);
    localStorage.set('offlineReports', reports);
  },

  syncLocalReports: async () => {
    const reports = localStorage.get('offlineReports') || [];
    for (const report of reports) {
      await CatchReport.createReport(report.userId, report.species, report.quantity, report.location, report.method_of_fishing, report.status, report.date);
    }
    localStorage.remove('offlineReports');
  },

  getAllReports: async (filters = {}) => {
    let query = `
      SELECT catch_reports.*, users.name AS user_name 
      FROM catch_reports 
      JOIN users ON catch_reports.user_id = users.id 
      WHERE 1=1
    `;
    let params = [];
    let count = 1;

    if (filters.species) {
      query += ` AND catch_reports.species ILIKE $${count++}`;
      params.push(`%${filters.species}%`);
    }
    if (filters.location) {
      query += ` AND catch_reports.location ILIKE $${count++}`;
      params.push(`%${filters.location}%`);
    }
    if (filters.status) {
      query += ` AND catch_reports.status = $${count++}`;
      params.push(filters.status);
    }
    if (filters.method_of_fishing) {
      query += ` AND catch_reports.method_of_fishing = $${count++}`;
      params.push(filters.method_of_fishing);
    }
    if (filters.date) {
      query += ` AND catch_reports.date = $${count++}`;
      params.push(filters.date);
    }
    query += filters.sortBy 
      ? ` ORDER BY catch_reports.${filters.sortBy} ASC`
      : ` ORDER BY catch_reports.date DESC`;

    const result = await db.query(query, params);
    return result.rows;
  },

  getReportsByUser: async (userId) => {
    const result = await db.query(`SELECT * FROM catch_reports WHERE user_id = $1`, [userId]);
    return result.rows;
  },

  insertPrediction: async (species, predicted_best_time, predicted_quantity, confidence) => {
    const query = `
      INSERT INTO catch_predictions (species, predicted_best_time, predicted_quantity, confidence)
      VALUES ($1, $2, $3, $4)
    `;
    return db.query(query, [species, predicted_best_time, predicted_quantity, confidence]);
  },

  getPredictions: async () => {
    const result = await db.query(`SELECT * FROM catch_predictions ORDER BY predicted_best_time ASC`);
    return result.rows;
  },

  updateReportStatus: async (reportId, status) => {
    const result = await db.query(
      `UPDATE catch_reports SET status = $1 WHERE id = $2`,
      [status, reportId]
    );
    return result;
  },

  getTotalReports: async () => {
    const result = await db.query(`SELECT COUNT(*) AS total FROM catch_reports`);
    return parseInt(result.rows[0].total);
  },

  getApprovedReports: async () => {
    const result = await db.query(`SELECT COUNT(*) AS total FROM catch_reports WHERE status = 'Approved'`);
    return parseInt(result.rows[0].total);
  },

  getFlaggedReports: async () => {
    const result = await db.query(`SELECT COUNT(*) AS total FROM catch_reports WHERE status = 'Flagged'`);
    return parseInt(result.rows[0].total);
  },

  getSpeciesData: async () => {
    const result = await db.query(`SELECT species, COUNT(*) AS count FROM catch_reports GROUP BY species`);
    return result.rows;
  },

  getStatusData: async () => {
    const result = await db.query(`SELECT status, COUNT(*) AS count FROM catch_reports GROUP BY status`);
    return result.rows;
  },

  getDailyReports: async () => {
    const result = await db.query(`
      SELECT DATE(date) AS report_date, COUNT(*) AS count
      FROM catch_reports
      GROUP BY DATE(date)
    `);
    return result.rows;
  },

  getFilteredReports: async (startDate, endDate, species, location) => {
    let query = `
      SELECT species, quantity, location, status, date 
      FROM catch_reports 
      WHERE 1=1
    `;
    let params = [];
    let count = 1;

    if (startDate) {
      query += ` AND date >= $${count++}`;
      params.push(startDate);
    }
    if (endDate) {
      query += ` AND date <= $${count++}`;
      params.push(endDate);
    }
    if (species) {
      query += ` AND species = $${count++}`;
      params.push(species);
    }
    if (location) {
      query += ` AND location = $${count++}`;
      params.push(location);
    }

    const result = await db.query(query, params);
    return result.rows;
  },

  getDistinctSpecies: async () => {
    const result = await db.query(`SELECT DISTINCT species FROM catch_reports`);
    return result.rows.map(row => row.species);
  },

  getDistinctLocations: async () => {
    const result = await db.query(`SELECT DISTINCT location FROM catch_reports`);
    return result.rows.map(row => row.location);
  },

  getUserTotalCatches: async (userId) => {
    try {
      const result = await db.query(
        `SELECT COUNT(*) AS total FROM catch_reports WHERE user_id = $1`,
        [userId]
      );
      return parseInt(result.rows[0].total) || 0;
    } catch (error) {
      console.error("Database Error:", error);
      return 0;
    }
  }
};

module.exports = CatchReport;
