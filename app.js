const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { signup, login } = require("./controllers/UserController");

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route to handle signup POST requests
app.post("/signup", signup);

// Route to handle login POST requests
app.post("/login", login);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
