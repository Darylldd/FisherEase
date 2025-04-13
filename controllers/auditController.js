const AuditLog = require('../models/AuditLogs');
const db = require("../models/db");


exports.getAuditLogs = async (req, res) => {
    try {
        const [logs] = await db.execute(`
            SELECT audit_logs.*, users.name 
            FROM audit_logs
            JOIN users ON audit_logs.user_id = users.id
            ORDER BY audit_logs.timestamp DESC
        `);
        const user = req.session.user || null;

        res.render("admin/audit_logs", { logs, user });
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.logUserActivity = async (req, action) => {
    try {
        const userId = req.session.userId || null;
        const userEmail = req.session.user ? req.session.user.email : 'Unknown';

        await AuditLog.logActivity(userId, userEmail, action);
    } catch (err) {
        console.error("Error logging user activity:", err);
    }
};
