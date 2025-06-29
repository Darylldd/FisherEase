const db = require("./db");

const ClimateEventLossModel = {
    async reportLoss(userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath) {
        const query = `
            INSERT INTO climate_event_losses (
                user_id, event_type, date, species_lost, estimated_loss_kg, 
                estimated_loss_value, description, location, image_path
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `;
        const [result] = await db.query(query, [
            userId, eventType, date, speciesLost, lossKg, 
            lossValue, description, location, imagePath
        ]);
        return result.id;
    },

    async getUserLossReports(userId) {
        const query = `
            SELECT * FROM climate_event_losses 
            WHERE user_id = $1 
            ORDER BY date DESC
        `;
        const [rows] = await db.query(query, [userId]);
        return rows;
    },

    async getAllLossReports() {
        const query = `
            SELECT cel.*, u.name as user_name 
            FROM climate_event_losses cel
            JOIN users u ON cel.user_id = u.id
            ORDER BY cel.date DESC
        `;
        const [rows] = await db.query(query);
        return rows;
    }
};

module.exports = ClimateEventLossModel;