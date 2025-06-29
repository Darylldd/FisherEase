const db = require('./db'); // Import your PostgreSQL DB connection (e.g., using node-postgres)

class Fisherfolk {
    static async create(data) {
        try {
            const { number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay } = data;
            await db.query(
                "INSERT INTO fisherfolk (number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
                [number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay]
            );
        } catch (error) {
            throw error; // Let controller handle errors
        }
    }

    static async getAll() {
        try {
            const { rows } = await db.query("SELECT * FROM fisherfolk");
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Fisherfolk;