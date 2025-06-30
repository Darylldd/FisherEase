const db = require('./db'); // PostgreSQL db.js using pg Pool

// Function to register a new aquaculture facility
module.exports.registerAquaculture = async (data) => {
  const { facility_name, location, species, capacity, owner, contact_info } = data;

  const query = `
    INSERT INTO aquaculture_facilities 
      (facility_name, location, species, capacity, owner, contact_info)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;

  const result = await db.query(query, [
    facility_name,
    location,
    species,
    capacity,
    owner,
    contact_info
  ]);

  return result.rows[0]; // Return the inserted row
};
