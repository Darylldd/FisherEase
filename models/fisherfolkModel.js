const db = require('./db');  // Import your DB connection

class Fisherfolk {
    static async create(data) {
        try {
            const { number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay } = data;
            await db.query(
                "INSERT INTO fisherfolk (number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay]
            );
        } catch (error) {
            throw error; // Let controller handle errors
        }
    }

    static async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM fisherfolk");
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Fisherfolk;