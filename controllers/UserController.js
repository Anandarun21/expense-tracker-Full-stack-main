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
        const user = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (user.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Respond with success message
        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    signup,
    login
};
