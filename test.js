require("dotenv").config();

const generateToken = require("./src/utils/generateToken");

const token = generateToken({ id: "1", role: "user" });
console.log(token);