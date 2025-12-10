const db = require('./db');

class AdmeasurementModel {
  static async create(data) {
const query = `
INSERT INTO admeasurement_forms (
  fvr_no, date, owner_name, address, vessel_name, vessel_type,
  length_meters, breadth_meters, depth_meters, gross_tonnage, net_tonnage,
  engine_make, serial_number, horse_power, number_of_cylinders,
  place_of_inspection, date_of_inspection,
  remarks, fishing_vessel_id, fisherfolk_id,
  mayor_name, mayor_signature, term_start, term_end
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  data.fvr_no,
  data.date,
  data.owner_name,
  data.address,
  data.vessel_name,
  data.vessel_type,
  data.length_meters,
  data.breadth_meters,
  data.depth_meters,
  data.gross_tonnage,
  data.net_tonnage,
  data.engine_make,
  data.serial_number,
  data.horse_power,
  data.number_of_cylinders,
  data.place_of_inspection,
  data.date_of_inspection,
  data.remarks,
  data.fishing_vessel_id,
  data.fisherfolk_id,
  data.mayor_name,
  data.mayor_signature,
  data.term_start,
  data.term_end
];

    return db.query(query, values);
  }

 static async getAll() {
  const [rows] = await db.query(`
    SELECT 
      a.*, 
      r.fishing_vessel_name, 
      CONCAT(f.first_name, ' ', f.middle_name, ' ', f.last_name) AS owner_fullname
    FROM admeasurement_forms a
    LEFT JOIN fishing_vessel_registrations r ON a.fishing_vessel_id = r.id
    LEFT JOIN fisherfolk f ON a.fisherfolk_id = f.id
    ORDER BY a.date DESC
  `);
  return rows;
}
}

module.exports = AdmeasurementModel;
