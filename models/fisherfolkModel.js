const db = require('./db'); // Assumes db is a mysql2/promise pool

class Fisherfolk {
    static async create(data) {
        try {
            const { license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status } = data;
            const [result] = await db.query(
                "INSERT INTO fisherfolk ( license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status]
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
                    f.license_number,
                    f.date_registered,
                    f.first_name,
                    f.middle_name,
                    f.last_name,
                    CONCAT(f.first_name, ' ', f.middle_name, ' ', f.last_name) AS fullname,
                    f.address,
                    f.contact_info,
                    f.fishing_methods,
                    f.fishing_zone,
                    
                    f.civil_status,
                    
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
                    license_number,
                    date_registered,
                    first_name,
                    middle_name,
                    last_name,
                    address,
                    contact_info,
                    fishing_methods,
                    fishing_zone,
                    civil_status
                  
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
            const { license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status} = data;
            const [result] = await db.query(
                "UPDATE fisherfolk SET license_number = ?, date_registered = ?, first_name = ?, middle_name = ?, last_name = ?, address = ?, contact_info = ?, fishing_methods = ?, fishing_zone = ?, civil_status = ? WHERE id = ?",
                [license_number, date_registered, first_name, middle_name, last_name, address, contact_info, fishing_methods, fishing_zone, civil_status,  id]
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