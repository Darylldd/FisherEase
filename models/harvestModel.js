const db = require("./db");

const Harvest = {
    addHarvest: async (userId, fishType, weight, unit, ownership, sourceOfFry, marketDestination, remarks, dateHarvested) => {
        const sql = "INSERT INTO harvest_production (user_id, fish_type, weight, unit, ownership, source_of_fry, market_destination, remarks, date_harvested) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await db.execute(sql, [userId, fishType, weight, unit, ownership, sourceOfFry, marketDestination, remarks, dateHarvested]);
    },
    
    getAllHarvests: async () => {
        const [rows] = await db.execute("SELECT * FROM harvest_production ORDER BY date_harvested DESC");
        return rows;
    },

    getHarvestByUser: async (userId) => {
        const [rows] = await db.execute("SELECT * FROM harvest_production WHERE user_id = ? ORDER BY date_harvested DESC", [userId]);
        return rows;
    },
 getFilteredHarvests: async (month, year) => {
    let sql = `
        SELECT 
            hp.*, 
            u.name AS user_name
        FROM harvest_production hp
        JOIN users u ON hp.user_id = u.id
        WHERE 1=1
    `;
    const params = [];

    if (month) {
        sql += " AND MONTH(hp.date_harvested) = ?";
        params.push(month);
    }

    if (year) {
        sql += " AND YEAR(hp.date_harvested) = ?";
        params.push(year);
    }

    sql += " ORDER BY hp.date_harvested DESC";

    const [rows] = await db.execute(sql, params);
    return rows;
}


};

module.exports = Harvest;