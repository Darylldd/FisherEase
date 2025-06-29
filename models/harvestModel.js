const db = require('./db'); // Import PostgreSQL DB connection (e.g., node-postgres)

const Harvest = {
  addHarvest: async (userId, fishType, weight, unit, ownership, sourceOfFry, marketDestination, remarks, dateHarvested) => {
    try {
      const query = `
        INSERT INTO harvest_production (user_id, fish_type, weight, unit, ownership, source_of_fry, market_destination, remarks, date_harvested)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
      `;
      const values = [userId, fishType, weight, unit, ownership, sourceOfFry, marketDestination, remarks, dateHarvested];
      const { rows } = await db.query(query, values);
      return rows[0].id;
    } catch (error) {
      console.error("Error adding harvest:", error);
      throw error;
    }
  },

  getAllHarvests: async () => {
    try {
      const { rows } = await db.query("SELECT * FROM harvest_production ORDER BY date_harvested DESC");
      return rows;
    } catch (error) {
      console.error("Error fetching all harvests:", error);
      throw error;
    }
  },

  getHarvestByUser: async (userId) => {
    try {
      const { rows } = await db.query("SELECT * FROM harvest_production WHERE user_id = $1 ORDER BY date_harvested DESC", [userId]);
      return rows;
    } catch (error) {
      console.error("Error fetching user harvests:", error);
      throw error;
    }
  }
};

module.exports = Harvest;