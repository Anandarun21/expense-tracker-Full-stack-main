const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Login route
router.post('/login', UserController.login);

module.exports = router;
