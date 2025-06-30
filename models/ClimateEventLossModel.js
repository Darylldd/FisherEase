// models/ClimateEventLossModel.js
const db = require("./db");

const ClimateEventLossModel = {
    async reportLoss(userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath) {
        const query = `
            INSERT INTO climate_event_losses 
            (user_id, event_type, date, species_lost, estimated_loss_kg, estimated_loss_value, description, location, image_path)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`;
        const values = [userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    async getUserLossReports(userId) {
        const query = `
            SELECT *, 
                   TO_CHAR(date, 'YYYY-MM-DD') AS formatted_date
            FROM climate_event_losses 
            WHERE user_id = $1 
            ORDER BY date DESC`;
        const { rows } = await db.query(query, [userId]);
        return rows;
    },

    // models/ClimateEventLossModel.js
async getAllLossReportsWithUser() {
  try {
    const query = `
      SELECT 
        c.*, 
        u.name AS user_name,
        u.id AS user_id,  // Explicitly select user id
        TO_CHAR(c.date, 'YYYY-MM-DD') AS formatted_date
      FROM climate_event_losses c
      LEFT JOIN users u ON c.user_id = u.id  // Use LEFT JOIN to include reports even if user is deleted
      ORDER BY c.date DESC`;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    return []; 
  }
}
};

module.exports = ClimateEventLossModel;