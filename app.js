const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost', // Assuming your database is hosted locally
    user: 'root',
    password: 'Arunvenkat@74',
    database: 'fullexpense'
});

// Function to execute SQL queries
function query(sql, args) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(sql, args, (err, rows) => {
                connection.release(); // Release connection after query
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    });
}

// Route to handle signup POST requests
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Add new user to the database
        await query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

        // Respond with success message
        res.status(200).json({ success: true, message: "Signup successful" });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Serve static files from the "public" directory
app.use(express.static("public"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
