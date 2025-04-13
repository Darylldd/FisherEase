// models/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',       // Add your WAMPP MySQL password if necessary
  database: 'fmo_db',
  waitForConnections: true,
  connectionLimit: 10,  // Adjust the connection limit as needed
  queueLimit: 0
});

module.exports = pool;
