const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost', // Update with your MySQL host
    user: 'root', // Update with your MySQL user
    password: 'password', // Update with your MySQL password
    database: 'arthurross' // Update with your MySQL database name
});

// Middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true }));

// Sign-up endpoint
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ errors: [{ message: 'All fields are required' }] });
        }

        // Check if the user already exists
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ errors: [{ message: 'Email already in use' }] });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ errors: [{ message: 'Server error' }] });
    }
});

module.exports = router;
