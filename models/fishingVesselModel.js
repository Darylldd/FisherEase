const db = require('./db');

class FishingVesselModel {
  static async createRegistration(data) {
    const query = `
      INSERT INTO fishing_vessel_registrations (
        fisherfolk_id, registration_type, fishing_vessel_name, vessel_type, homeport,
        boat_builder_name, place_built, year_built,
        previous_homeport, change_homeport_date,
        previous_owner_name, previous_owner_address,
        original_vessel_name, proposed_name_1, proposed_name_2,
        cancellation_reason, remarks, submitted_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.fisherfolk_id,
      data.registration_type,
      data.fishing_vessel_name,
      data.vessel_type,
      data.homeport || 'Calapan City',
      data.boat_builder_name,
      data.place_built,
      data.year_built,
      data.previous_homeport,
      data.change_homeport_date,
      data.previous_owner_name,
      data.previous_owner_address,
      data.original_vessel_name,
      data.proposed_name_1,
      data.proposed_name_2,
      data.cancellation_reason,
      data.remarks,
      data.submitted_by ?? 'Admin' // LAST VALUE, maps to last `?`
    ];

    try {
      return await db.query(query, values);
    } catch (error) {
      console.error('Error inserting vessel registration:', error);
      throw error;
    }
  }

  static async getAllRegistrations(filters = {}, sortBy = '') {
    let query = `
      SELECT r.*, CONCAT(f.first_name, ' ', f.last_name) AS fisherfolk_name
      FROM fishing_vessel_registrations r
      JOIN fisherfolk f ON r.fisherfolk_id = f.id
      WHERE 1=1
    `;
    const values = [];

    if (filters.vessel_name) {
      query += ' AND r.fishing_vessel_name LIKE ?';
      values.push(`%${filters.vessel_name}%`);
    }
    if (filters.owner) {
      query += ` AND CONCAT(f.first_name, ' ', f.last_name) LIKE ?`;
      values.push(`%${filters.owner}%`);
    }
    if (filters.year_built) {
      query += ' AND r.year_built = ?';
      values.push(filters.year_built);
    }

    if (sortBy) {
      const validSortColumns = ['fishing_vessel_name', 'vessel_type', 'fisherfolk_name', 'year_built'];
      if (validSortColumns.includes(sortBy)) {
        query += ` ORDER BY ${sortBy}`;
      }
    }

    try {
      const [rows] = await db.query(query, values);
      return rows;
    } catch (error) {
      console.error('Error fetching vessel registrations:', error);
      throw error;
    }
  }

  static async getFisherfolkList() {
    try {
      const [rows] = await db.query(`SELECT id, first_name, last_name FROM fisherfolk`);
      return rows;
    } catch (error) {
      console.error('Error fetching fisherfolk list:', error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await db.query('DELETE FROM fishing_vessel_registrations WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting registration:', error);
      throw error;
    }
  }
  static async getAllRegistrationsByDate(month, year) {
  let query = `
    SELECT r.*, CONCAT(f.first_name, ' ', f.last_name) AS fisherfolk_name
    FROM fishing_vessel_registrations r
    JOIN fisherfolk f ON r.fisherfolk_id = f.id
    WHERE 1=1
  `;
  const values = [];

  if (month) {
    query += ' AND MONTH(r.created_at) = ?';
    values.push(month);
  }

  if (year) {
    query += ' AND YEAR(r.created_at) = ?';
    values.push(year);
  }

  query += ' ORDER BY r.created_at DESC';

  try {
    const [rows] = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error('Error filtering vessel registrations:', error);
    throw error;
  }
}
static async getAll() {
  try {
    const [rows] = await db.query(`SELECT id, fishing_vessel_name, vessel_type, fisherfolk_id FROM fishing_vessel_registrations`);
    return rows;
  } catch (error) {
    console.error('Error fetching all vessels:', error);
    throw error;
  }
}


}

module.exports = FishingVesselModel;
