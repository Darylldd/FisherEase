// mayorModel.js
const db = require('./db');

class MayorModel {
  static async getCurrent() {
    const [rows] = await db.query(
      `SELECT * FROM mayor WHERE NOW() BETWEEN term_start AND term_end LIMIT 1`
    );
    return rows[0] || null;
  }
  static async getMayorInfo() {
  const [rows] = await db.query(`
    SELECT mayor_name, mayor_signature 
    FROM admeasurement_forms 
    ORDER BY id DESC
    LIMIT 1
  `);
  return rows[0] || { mayor_name: 'Admin', mayor_signature: '' };

}
}

module.exports = MayorModel;
