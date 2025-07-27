const db = require('./db'); // Assumes db is a mysql2/promise pool

module.exports.registerAquaculture = async (data) => {
    const { facility_name, location, species, capacity, owner, contact_info } = data;
    const query = `INSERT INTO aquaculture_facilities (facility_name, location, species, capacity, owner, contact_info) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        const [results] = await db.query(query, [facility_name, location, species, capacity, owner, contact_info]);
        return results;
    } catch (err) {
        throw err;
    }
};

module.exports.getAllFacilities = async (page, limit) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;
    
    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new Error('Invalid pagination parameters');
    }

    const dataQuery = `SELECT * FROM aquaculture_facilities LIMIT ? OFFSET ?`;
    const countQuery = `SELECT COUNT(*) as total FROM aquaculture_facilities`;

    try {
        const [facilities] = await db.query(dataQuery, [limitNum, offset]);
        const [countResult] = await db.query(countQuery);
        return {
            facilities,
            total: countResult[0].total
        };
    } catch (err) {
        throw err;
    }
};

module.exports.getFacilityById = async (id) => {
    const query = `SELECT * FROM aquaculture_facilities WHERE id = ?`;
    try {
        const [results] = await db.query(query, [id]);
        return results[0];
    } catch (err) {
        throw err;
    }
};

module.exports.updateFacility = async (id, data) => {
    const { facility_name, location, species, capacity, owner, contact_info } = data;
    const query = `UPDATE aquaculture_facilities 
                   SET facility_name = ?, location = ?, species = ?, capacity = ?, owner = ?, contact_info = ?
                   WHERE id = ?`;
    try {
        const [results] = await db.query(query, [facility_name, location, species, capacity, owner, contact_info, id]);
        return results;
    } catch (err) {
        throw err;
    }
};

module.exports.deleteFacility = async (id) => {
    const query = `DELETE FROM aquaculture_facilities WHERE id = ?`;
    try {
        const [results] = await db.query(query, [id]);
        return results;
    } catch (err) {
        throw err;
    }
};