// models/db.js
const { Pool } = require('pg');

// Render PostgreSQL setup (via environment variables)
const pool = new Pool({
  host: process.env.DB_HOST,      
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false     // Required by Render’s managed PostgreSQL
  }
});

module.exports = pool;
