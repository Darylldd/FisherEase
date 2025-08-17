const pool = require('./db');

class PostHarvest {
    static async create(data) {
        const query = `
            INSERT INTO post_harvest (license_number, date_registered, first_name, middle_name, last_name, address, contact_info, processing_method, processing_location, civil_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.license_number,
            data.date_registered,
            data.first_name,
            data.middle_name || null,
            data.last_name,
            data.address,
            data.contact_info,
            data.processing_method,
            data.processing_location,
            data.civil_status
        ];
        try {
            const [result] = await pool.execute(query, values);
            return result;
        } catch (error) {
            throw new Error('Error creating post-harvest record: ' + error.message);
        }
    }

    static async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM post_harvest
            ORDER BY date_registered DESC
            LIMIT ? OFFSET ?
        `;
        const countQuery = `
            SELECT COUNT(*) as total FROM post_harvest
        `;
        try {
            const [rows] = await pool.query(query, [limit, offset]);
            const [countResult] = await pool.query(countQuery);
            const total = countResult[0].total;
            return { rows, total, page };
        } catch (error) {
            console.error('Query error:', error.message, { query });
            throw new Error('Error fetching post-harvest records: ' + error.message);
        }
    }

    static async getTotalPostHarvest() {
        const query = `
            SELECT COUNT(*) as total FROM post_harvest
        `;
        try {
            const [result] = await pool.query(query);
            return result[0].total; // Returns the total number of post-harvest records
        } catch (error) {
            throw new Error('Error fetching total post-harvest records: ' + error.message);
        }
    }

    static async getPostHarvestAnalytics() {
        const query = `
            SELECT processing_method, COUNT(*) as count
            FROM post_harvest
            GROUP BY processing_method
            ORDER BY count DESC
        `;
        try {
            const [rows] = await pool.query(query);
            return rows; // Returns [{ processing_method: "Drying", count: 10 }, ...]
        } catch (error) {
            throw new Error('Error fetching post-harvest analytics: ' + error.message);
        }
    }
}

module.exports = PostHarvest;