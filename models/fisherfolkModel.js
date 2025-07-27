const db = require('./db'); // Assumes db is a mysql2/promise pool

class Fisherfolk {
    static async create(data) {
        try {
            const { number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay } = data;
            const [result] = await db.query(
                "INSERT INTO fisherfolk (number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    f.id,
                    f.number,
                    f.date_registered,
                    f.first_name,
                    f.middle_name,
                    f.last_name,
                    CONCAT(f.first_name, ' ', f.middle_name, ' ', f.last_name) AS fullname,
                    f.address,
                    f.contact_info,
                    f.fishing_methods,
                    f.fishing_zone,
                    f.license_number,
                    f.civil_status,
                    f.barangay,
                    r.id AS vessel_id,
                    r.fishing_vessel_name
                FROM fisherfolk f
                LEFT JOIN fishing_vessel_registrations r 
                    ON f.id = r.fisherfolk_id
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    id,
                    number,
                    date_registered,
                    first_name,
                    middle_name,
                    last_name,
                    address,
                    contact_info,
                    fishing_methods,
                    fishing_zone,
                    license_number,
                    civil_status,
                    barangay
                FROM fisherfolk 
                WHERE id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const { number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay } = data;
            const [result] = await db.query(
                "UPDATE fisherfolk SET number = ?, date_registered = ?, first_name = ?, middle_name = ?, last_name = ?, address = ?, contact_info = ?, fishing_methods = ?, fishing_zone = ?, license_number = ?, civil_status = ?, barangay = ? WHERE id = ?",
                [number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, license_number, civil_status, barangay, id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query("DELETE FROM fisherfolk WHERE id = ?", [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Fisherfolk;