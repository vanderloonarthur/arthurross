const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const userRepository = require('../db/userRepository');

// Middleware to parse JSON data
router.use(bodyParser.json());

// Sign-up endpoint
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ errors: [{ message: 'All fields are required' }] });
        }

        // Check if the email already exists
        const emailRows = await userRepository.findUserByEmail(email);
        if (emailRows.length > 0) {
            return res.status(400).json({ errors: [{ message: 'Email already in use' }] });
        }

        // Check if the username already exists
        const usernameRows = await userRepository.findUserByUsername(username);
        if (usernameRows.length > 0) {
            return res.status(400).json({ errors: [{ message: 'Username already in use' }] });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await userRepository.createUser(username, email, hashedPassword);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ errors: [{ message: 'Server error' }] });
    }
});

module.exports = router;
