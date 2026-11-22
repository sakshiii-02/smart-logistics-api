const {Pool} = require('pg');
require('dotenv').config();

const db = new Pool({
    connectionString:
        process.env.NODE_ENV === "test"
            ? process.env.TEST_DATABASE_URL
            : process.env.DATABASE_URL
});

if (process.env.NODE_ENV === "test") {
    console.log("Using test database:", process.env.DB_NAME);
}

db.on('error', (err) => {
    console.error('Unexpected database error:', err.message);
});

module.exports = db;