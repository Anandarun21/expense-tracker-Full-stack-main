const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { signup, login } = require("./controllers/UserController");
const authRoutes = require("./routes/authRoutes");

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Use routes
app.use("/api", authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
