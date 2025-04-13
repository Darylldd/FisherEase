const db = require("./db");

const Harvest = {
    addHarvest: async (userId, fishType, weight, location, dateHarvested) => {
        const sql = "INSERT INTO harvest_production (user_id, fish_type, weight, location, date_harvested) VALUES (?, ?, ?, ?, ?)";
        await db.execute(sql, [userId, fishType, weight, location, dateHarvested]);
    },
    
    getAllHarvests: async () => {
        const [rows] = await db.execute("SELECT * FROM harvest_production ORDER BY date_harvested DESC");
        return rows;
    },

    getHarvestByUser: async (userId) => {
        const [rows] = await db.execute("SELECT * FROM harvest_production WHERE user_id = ? ORDER BY date_harvested DESC", [userId]);
        return rows;
    }
};

module.exports = Harvest;
