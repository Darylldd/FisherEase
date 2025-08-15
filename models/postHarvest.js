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

    static async getAll() {
        const query = `
            SELECT * FROM post_harvest
            ORDER BY date_registered DESC
        `;
        try {
            const [rows] = await pool.query(query);
            return { rows };
        } catch (error) {
            console.error('Query error:', error.message, { query });
            throw new Error('Error fetching post-harvest records: ' + error.message);
        }
    }
}

module.exports = PostHarvest;