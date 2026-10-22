const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
    return jwt.sign(
        {
            id: payload.id,
            role: payload.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "15m"
        }
    );
};

module.exports = generateToken;