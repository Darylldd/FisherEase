// models/aquacultureModel.js
const db = require('./db');  // Import your DB connection

// Function to register a new aquaculture facility
module.exports.registerAquaculture = (data, callback) => {
    const { facility_name, location, species, capacity, owner, contact_info } = data;
    const query = `INSERT INTO aquaculture_facilities (facility_name, location, species, capacity, owner, contact_info) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [facility_name, location, species, capacity, owner, contact_info], (err, results) => {
        if (err) {
            return callback(err);
        }
        return callback(null, results);
    });
};
