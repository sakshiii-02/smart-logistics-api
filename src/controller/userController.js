const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser(username, email, hashedPassword, role);
        const token = generateToken(newUser);
        res.status(201).json({ message: "User registered successfully", token });
    }catch (err){
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = generateToken(user);
        res.status(200).json({ message: "User logged in successfully", token });
    }catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    registerUser,
    loginUser
}