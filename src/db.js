const {Pool} = require('pg');
require('dotenv').config();

const db = new Pool({
    connectionString : process.env.DATABASE_URL
});

db.on('error', (err) => {
    console.error('Unexpected database error:', err.message);
});

module.exports = db;