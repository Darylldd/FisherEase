const db = require('./db');
const localStorage = require('local-storage');

const CatchReport = {

getAllReports: async (filters = {}) => {
  let query = `SELECT catch_reports.*, users.name AS user_name 
               FROM catch_reports 
               JOIN users ON catch_reports.user_id = users.id
               WHERE 1=1`;
  let params = [];

  if (filters.species) {
    query += " AND catch_reports.species LIKE ?";
    params.push(`%${filters.species}%`);
  }
  if (filters.location) {
    query += " AND catch_reports.location LIKE ?";
    params.push(`%${filters.location}%`);
  }
  if (filters.status) {
    query += " AND catch_reports.status = ?";
    params.push(filters.status);
  }
  if (filters.method_of_fishing) {
    query += " AND catch_reports.method_of_fishing = ?";
    params.push(filters.method_of_fishing);
  }
  if (filters.date) {
    query += " AND catch_reports.date = ?";
    params.push(filters.date);
  }
  if (filters.month && filters.year) {
    query += " AND MONTH(catch_reports.date) = ? AND YEAR(catch_reports.date) = ?";
    params.push(filters.month, filters.year);
  }
  if (filters.sortBy) {
    query += ` ORDER BY catch_reports.${filters.sortBy} ASC`;
  } else {
    query += " ORDER BY catch_reports.date DESC";
  }

  console.log('Executing query:', query, 'with params:', params); // Log query for debugging
  const [rows] = await db.execute(query, params);
  return rows;
},

  getApprovedReports: async () => {
    const query = `SELECT COUNT(*) AS total FROM catch_reports WHERE status = 'Approved'`;
    const [rows] = await db.execute(query);
    return rows.length > 0 ? rows[0].total : 0;
  },

    getDailyReports: async () => {
    const query = "SELECT DATE(date) AS report_date, COUNT(*) AS count FROM catch_reports GROUP BY DATE(date)";
    const [rows] = await db.execute(query);
    return rows;
  },

  getFilteredReports: async (filters = {}) => {
    let query = "SELECT species, quantity, location, status, date FROM catch_reports WHERE 1=1";
    let params = [];

    if (filters.startDate) {
      query += " AND date >= ?";
      params.push(filters.startDate);
    }
    if (filters.endDate) {
      query += " AND date <= ?";
      params.push(filters.endDate);
    }
    if (filters.species) {
      query += " AND species = ?";
      params.push(filters.species);
    }
    if (filters.location) {
      query += " AND location = ?";
      params.push(filters.location);
    }
    if (filters.month) {
      query += " AND MONTH(date) = ?";
      params.push(filters.month);
    }
    if (filters.year) {
      query += " AND YEAR(date) = ?";
      params.push(filters.year);
    }

    const [rows] = await db.execute(query, params);
    return rows;
  },

  createReport: async (userId, species, quantity, location, method_of_fishing, status = "Under Review", date) => {
    console.log("Creating Catch Report with values:", { userId, species, quantity, location, method_of_fishing, status, date });

    if (!userId || !species || !quantity || !location || !method_of_fishing || !date) {
      throw new Error("Missing required fields. Ensure all fields are provided.");
    }

    const query = `INSERT INTO catch_reports (user_id, species, quantity, location, method_of_fishing, status, date) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return db.execute(query, [userId, species, quantity, location, method_of_fishing, status, date]);
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



  getReportsByUser: async (userId) => {
    const query = `SELECT * FROM catch_reports WHERE user_id = ?`;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  insertPrediction: async (userId, species, predicted_best_time, predicted_quantity, confidence) => {
  const query = `
    INSERT INTO catch_predictions (user_id, species, predicted_best_time, predicted_quantity, confidence)
    VALUES (?, ?, ?, ?, ?)
  `;
  return db.execute(query, [userId, species, predicted_best_time, predicted_quantity, confidence]);
},

getPredictionsByUser: async (userId) => {
  const query = `SELECT * FROM catch_predictions WHERE user_id = ? ORDER BY predicted_best_time ASC`;
  const [rows] = await db.execute(query, [userId]);
  return rows;
},
  getPredictions: async () => {
    const query = "SELECT * FROM catch_predictions ORDER BY predicted_best_time ASC";
    const [rows] = await db.execute(query);
    return rows;
  },

  updateReportStatus: async (reportId, status) => {
    const query = `UPDATE catch_reports SET status = ? WHERE id = ?`;
    const [result] = await db.execute(query, [status, reportId]);
    return result;
  },

  getTotalReports: async () => {
    const query = `SELECT COUNT(*) AS total FROM catch_reports`;
    const [rows] = await db.execute(query);
    return rows.length > 0 ? rows[0].total : 0;
  },



  getFlaggedReports: async () => {
    const query = `SELECT COUNT(*) AS total FROM catch_reports WHERE status = 'Flagged'`;
    const [rows] = await db.execute(query);
    return rows.length > 0 ? rows[0].total : 0;
  },

  getSpeciesData: async () => {
    const query = "SELECT species, COUNT(*) AS count FROM catch_reports GROUP BY species";
    const [rows] = await db.execute(query);
    return rows;
  },

  getStatusData: async () => {
    const query = "SELECT status, COUNT(*) AS count FROM catch_reports GROUP BY status";
    const [rows] = await db.execute(query);
    return rows;
  },



  getDistinctSpecies: async () => {
    const [rows] = await db.execute("SELECT DISTINCT species FROM catch_reports");
    return rows.map(row => row.species);
  },

  getDistinctLocations: async () => {
    const [rows] = await db.execute("SELECT DISTINCT location FROM catch_reports");
    return rows.map(row => row.location);
  },

  getUserTotalCatches: async (userId) => {
    try {
      const [rows] = await db.execute(
        "SELECT COUNT(*) AS total FROM catch_reports WHERE user_id = ?",
        [userId]
      );
      return rows[0].total || 0;
    } catch (error) {
      console.error("Database Error:", error);
      return 0;
    }
  },
 getReportsByUserDetailed: async (userId, month, year) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM catch_reports 
       WHERE user_id = ? 
       AND MONTH(date) = ? 
       AND YEAR(date) = ?
       ORDER BY date DESC`,
      [userId, month, year]
    );
    return rows;
  } catch (err) {
    console.error("Get User Reports by Date error:", err);
    throw err;
  }
},
 getReportsByUserFiltered: async ({ userId, month, year }) => {
  let query = `
    SELECT * FROM catch_reports 
    WHERE user_id = ?
  `;
  let params = [userId];

  if (month && year) {
    query += " AND MONTH(date) = ? AND YEAR(date) = ?";
    params.push(month, year);
  }

  query += " ORDER BY date DESC";

  const [rows] = await db.execute(query, params);
  return rows;
},  

getReportsWithLocation: async (userId) => {
  const query = `
    SELECT id, species, quantity, location, 
           latitude, 
           longitude
    FROM catch_reports 
    WHERE user_id = ? 
    AND (latitude IS NOT NULL OR location IS NOT NULL)
    AND quantity > 0
  `;
  const [rows] = await db.execute(query, [userId]);
  console.log('Fetched reports from DB:', JSON.stringify(rows, null, 2));
  return rows;
},

  insertCluster: async (userId, clusterNumber, centerLat, centerLng, avgQuantity) => {
    const query = `
      INSERT INTO catch_clusters 
      (user_id, cluster_number, center_latitude, center_longitude, average_quantity)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      userId, 
      clusterNumber, 
      centerLat, 
      centerLng, 
      parseFloat(avgQuantity) || 0 // Ensure number
    ]);
    console.log(`Inserted cluster ${clusterNumber} for user ${userId}: ID ${result.insertId}`);
    return result.insertId;
  },

  linkReportToCluster: async (reportId, clusterId) => {
    const query = `
      INSERT INTO catch_report_clusters (report_id, cluster_id)
      VALUES (?, ?)
    `;
    console.log(`Linking report ${reportId} to cluster ${clusterId}`);
    await db.execute(query, [reportId, clusterId]);
  },

  clearClustersByUser: async (userId) => {
    await db.execute(`
      DELETE crc FROM catch_report_clusters crc
      JOIN catch_clusters cc ON crc.cluster_id = cc.cluster_id
      WHERE cc.user_id = ?
    `, [userId]);
    
    await db.execute(`
      DELETE FROM catch_clusters WHERE user_id = ?
    `, [userId]);
    console.log(`Cleared clusters for user ${userId}`);
  },

  getClustersByUser: async (userId) => {
    const query = `
      SELECT 
        cc.cluster_id,
        cc.cluster_number,
        cc.center_latitude,
        cc.center_longitude,
        COALESCE(cc.average_quantity, 0) as average_quantity,
        COUNT(crc.report_id) as report_count,
        GROUP_CONCAT(DISTINCT cr.species) as species_list
      FROM catch_clusters cc
      LEFT JOIN catch_report_clusters crc ON cc.cluster_id = crc.cluster_id
      LEFT JOIN catch_reports cr ON crc.report_id = cr.id
      WHERE cc.user_id = ?
      GROUP BY cc.cluster_id
      ORDER BY cc.cluster_number
    `;
    const [rows] = await db.execute(query, [userId]);
    console.log('Fetched clusters from DB:', JSON.stringify(rows, null, 2));
    return rows.map(row => ({
      ...row,
      average_quantity: parseFloat(row.average_quantity) || 0 // Ensure number
    }));
  },

  getReportsForCluster: async (clusterId) => {
    const query = `
      SELECT cr.* 
      FROM catch_reports cr
      JOIN catch_report_clusters crc ON cr.id = crc.report_id
      WHERE crc.cluster_id = ?
    `;
    const [rows] = await db.execute(query, [clusterId]);
    console.log(`Fetched reports for cluster ${clusterId}:`, JSON.stringify(rows, null, 2));
    return rows;
  }
};

module.exports = CatchReport;