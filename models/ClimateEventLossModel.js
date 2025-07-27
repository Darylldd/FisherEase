const db = require("./db");

const ClimateEventLossModel = {
    async reportLoss(userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath) {
        const query = `
            INSERT INTO climate_event_losses (user_id, event_type, date, species_lost, estimated_loss_kg, estimated_loss_value, description, location, image_path, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
        `;
        const [result] = await db.execute(query, [userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath]);
        return result.insertId;
    },

    async getUserLossReports(userId) {
        const query = `SELECT *, status FROM climate_event_losses WHERE user_id = ? ORDER BY date DESC`;
        const [rows] = await db.execute(query, [userId]);
        return rows;
    },

    async getAllLossReports() {
        const query = `
            SELECT cel.*, u.name AS user_name 
            FROM climate_event_losses cel
            JOIN users u ON cel.user_id = u.id
            ORDER BY cel.date DESC
        `;
        const [rows] = await db.execute(query);
        return rows;
    },

    async updateReportStatus(reportId, status) {
        const query = `UPDATE climate_event_losses SET status = ? WHERE id = ?`;
        const [result] = await db.execute(query, [status, reportId]);
        return result.affectedRows;
    }
};

module.exports = ClimateEventLossModel;