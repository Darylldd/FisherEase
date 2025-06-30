const pool = require("./db");

const ClimateEventLossModel = {
    async reportLoss(userId, eventType, date, speciesLost, lossKg, lossValue, description, location, imagePath) {
        try {
            const query = `
                INSERT INTO climate_event_losses 
                (user_id, event_type, date, species_lost, estimated_loss_kg, estimated_loss_value, description, location, image_path, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
                RETURNING id
            `;
            // Validate inputs
            if (!userId || !eventType || !date || !speciesLost || !lossKg || !lossValue || !description || !location) {
                throw new Error("Missing required fields");
            }
            const { rows } = await pool.query(query, [
                userId,
                eventType,
                date,
                speciesLost,
                parseFloat(lossKg),
                parseFloat(lossValue),
                description,
                location,
                imagePath || null // Handle optional imagePath
            ]);
            return rows[0].id;
        } catch (error) {
            console.error("Error in reportLoss:", error);
            throw error; // Propagate error to controller
        }
    },

    async getUserLossReports(userId) {
        try {
            const query = `
                SELECT cel.*, u.name as user_name 
                FROM climate_event_losses cel
                JOIN users u ON cel.user_id = u.id
                WHERE cel.user_id = $1 
                ORDER BY cel.date DESC
            `;
            const { rows } = await pool.query(query, [userId]);
            return rows;
        } catch (error) {
            console.error("Error in getUserLossReports:", error);
            throw error;
        }
    },

    async getAllLossReports() {
        try {
            const query = `
                SELECT cel.*, u.name as user_name, u.email as user_email
                FROM climate_event_losses cel
                JOIN users u ON cel.user_id = u.id
                ORDER BY cel.date DESC
            `;
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error("Error in getAllLossReports:", error);
            throw error;
        }
    },

    async updateReportStatus(id, status, adminId) {
        try {
            const query = `
                UPDATE climate_event_losses
                SET status = $1, reviewed_by = $2, reviewed_at = NOW()
                WHERE id = $3
                RETURNING *
            `;
            const { rows } = await pool.query(query, [status, adminId, id]);
            return rows[0];
        } catch (error) {
            console.error("Error in updateReportStatus:", error);
            throw error;
        }
    }
};

module.exports = ClimateEventLossModel;