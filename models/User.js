const db = require("../util/database");

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async findByEmail(email) {
        try {
            const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return users.length > 0 ? new User(users[0].name, users[0].email, users[0].password) : null;
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw error;
        }
    }

    async save() {
        try {
            await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [this.name, this.email, this.password]);
        } catch (error) {
            console.error("Error saving user:", error);
            throw error;
        }
    }
}

module.exports = User;
