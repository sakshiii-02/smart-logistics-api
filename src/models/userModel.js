const db = require("../db");

const createUser = async (username, email, password, role) => {
    const query = `INSERT INTO users (name, email, password_hash, role) values ($1, $2, $3, $4) RETURNING id, name, email, role, created_at AS "createdAt"`;
    const result = await db.query(query , [username, email, password, role]);
    return result.rows[0];
}

const getUserByEmail = async (email) => {
    const query = `SELECT id, name, email, password_hash, role FROM users WHERE email = $1`;
    const result = await db.query(query,[email]);
    return result.rows[0];
}

module.exports = {
    createUser,
    getUserByEmail
}