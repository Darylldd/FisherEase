const db = require("./db");

const ClimateEventLossModel = {
    async reportLoss(userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath) {
        const query = `
            INSERT INTO climate_event_losses (user_id, event_type, date, species_lost, estimated_loss_kg, estimated_loss_value, description, location, image_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath]);
        return result.insertId;
    },

    async getUserLossReports(userId) {
        const query = `SELECT * FROM climate_event_losses WHERE user_id = ? ORDER BY date DESC`;
        const [rows] = await db.execute(query, [userId]);
        return rows;
    },
     async getAllLossReportsWithUser() {
    const query = `
      SELECT c.*, u.name AS user_name
      FROM climate_event_losses c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.date DESC
    `;
    const { rows } = await db.query(query);
    return rows;
  }
};

module.exports = ClimateEventLossModel;