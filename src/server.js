require("dotenv").config();
const db = require('./db')

const app = require("./app");

const PORT = process.env.PORT || 8000;

db.query('SELECT NOW() AS current_time')
    .then((result) => {
        console.log('Database connected:', result.rows[0]);
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
    });

app.listen(PORT, () => {
    console.log("Server is running on port: "+PORT);
})