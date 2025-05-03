const db = require('./db');
const localStorage = require('local-storage');

const CatchReport = {
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
    if (filters.sortBy) {
        query += ` ORDER BY catch_reports.${filters.sortBy} ASC`;
    } else {
        query += " ORDER BY catch_reports.date DESC";
    }

    const [rows] = await db.execute(query, params);
    return rows;
},

    getReportsByUser: async (userId) => {
        const query = `SELECT * FROM catch_reports WHERE user_id = ?`;
        const [rows] = await db.execute(query, [userId]);
        return rows;
    },

    insertPrediction: async (species, predicted_best_time, predicted_quantity, confidence) => {
        const query = `INSERT INTO catch_predictions (species, predicted_best_time, predicted_quantity, confidence) VALUES (?, ?, ?, ?)`;
        return db.execute(query, [species, predicted_best_time, predicted_quantity, confidence]);
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
     // Get total number of reports
     getTotalReports: async () => {
        const query = `SELECT COUNT(*) AS total FROM catch_reports`;
        const [rows] = await db.execute(query);
        return rows.length > 0 ? rows[0].total : 0;
    },

    getApprovedReports: async () => {
        const query = `SELECT COUNT(*) AS total FROM catch_reports WHERE status = 'Approved'`;
        const [rows] = await db.execute(query);
        return rows.length > 0 ? rows[0].total : 0;
    },

    getFlaggedReports: async () => {
        const query = `SELECT COUNT(*) AS total FROM catch_reports WHERE status = 'Flagged'`;
        const [rows] = await db.execute(query);
        return rows.length > 0 ? rows[0].total : 0;
    },

    // Get catch data grouped by species
    getSpeciesData: async () => {
        const query = "SELECT species, COUNT(*) AS count FROM catch_reports GROUP BY species";
        const [rows] = await db.execute(query);
        return rows;
    },

    // Get catch reports grouped by status
    getStatusData: async () => {
        const query = "SELECT status, COUNT(*) AS count FROM catch_reports GROUP BY status";
        const [rows] = await db.execute(query);
        return rows;
    },

    // Get daily reports (reports per day)
    getDailyReports: async () => {
        const query = "SELECT DATE(date) AS report_date, COUNT(*) AS count FROM catch_reports GROUP BY DATE(date)";
        const [rows] = await db.execute(query);
        return rows;
    },
    getFilteredReports: async (startDate, endDate, species, location) => {
        let query = "SELECT species, quantity, location, status, date FROM catch_reports WHERE 1=1";
        let params = [];

        if (startDate) {
            query += " AND date >= ?";
            params.push(startDate);
        }
        if (endDate) {
            query += " AND date <= ?";
            params.push(endDate);
        }
        if (species) {
            query += " AND species = ?";
            params.push(species);
        }
        if (location) {
            query += " AND location = ?";
            params.push(location);
        }

        const [rows] = await db.execute(query, params);
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
    
   
    async getUserTotalCatches(userId) {
        try {
            const [rows] = await db.execute(
                "SELECT COUNT(*) AS total FROM catch_reports WHERE user_id = ?",
                [userId]
            );
            return rows[0].total || 0; // Return the total count
        } catch (error) {
            console.error("Database Error:", error);
            return 0; // Return 0 if an error occurs
        }
    }
};

module.exports = CatchReport;
