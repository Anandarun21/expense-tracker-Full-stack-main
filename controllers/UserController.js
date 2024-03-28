const db = require("../util/database");
const User = require('../models/User');

// Signup controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Add new user to the database
        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

        // Respond with success message
        res.status(200).json({ success: true, message: "Signup successful" });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Login controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if password matches
        const user = users[0];
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "User not authorized" });
        }

        // Password matches, send success message
        res.status(200).json({ success: true, message: "User login successful" });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
module.exports = {
    signup,
    login
};
