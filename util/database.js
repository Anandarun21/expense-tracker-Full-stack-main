const mysql = require('mysql');

// Create connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
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

// Function to create users table
async function createUsersTable() {
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;
    try {
        await query(createUserTableQuery);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", error);
        throw error;
    }
}

// Create users table when establishing connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error establishing database connection:", err);
        throw err;
    }
    console.log("Connected to MySQL database");
    createUsersTable()
        .then(() => {
            connection.release();
        })
        .catch(error => {
            connection.release();
            console.error("Error creating users table:", error);
        });
});

module.exports = {
    query
};
