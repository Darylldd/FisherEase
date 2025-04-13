const db = require('./db');  // Import your DB connection

class Fisherfolk {
    static async create(data) {
        try {
            const { first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number } = data;
            await db.query(
                "INSERT INTO fisherfolk (first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number]
            );
        } catch (error) {
            throw error; // Let controller handle errors
        }
    }
}

module.exports = Fisherfolk;
