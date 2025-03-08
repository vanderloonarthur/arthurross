const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost', // Update with your MySQL host
    user: 'root', // Update with your MySQL user
    password: 'password', // Update with your MySQL password
    database: 'arthurross' // Update with your MySQL database name
});

// Middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true }));

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(400).json({ errors: [{ message: 'Invalid username or password' }] });
        }

        const user = rows[0];

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ message: 'Invalid username or password' }] });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ errors: [{ message: 'Server error' }] });
    }
});

module.exports = router;
