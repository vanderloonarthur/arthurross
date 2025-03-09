const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const userRepository = require('../db/userRepository');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Middleware to parse JSON data
router.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Sign-up endpoint with validation
router.post(
    '/signup',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body;

            // Check if the email already exists
            const emailExists = await userRepository.findUserByEmail(email);
            if (emailExists.length > 0) {
                return res.status(400).json({ errors: [{ message: 'Email already in use' }] });
            }

            // Check if the username already exists
            const usernameExists = await userRepository.findUserByUsername(username);
            if (usernameExists.length > 0) {
                return res.status(400).json({ errors: [{ message: 'Username already in use' }] });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Generate a verification token
            const verificationToken = crypto.randomBytes(32).toString('hex');

            // Insert the new user into the database with the verification token
            await userRepository.createUser(username, email, hashedPassword, verificationToken);

            // Send verification email
            const verificationUrl = `https://www.arthurross.nl/verify-email?token=${verificationToken}`;
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Email Verification',
                text: `Please verify your email by clicking the following link: ${verificationUrl}`,
                html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`
            };

            await transporter.sendMail(mailOptions);

            res.status(201).json({ message: 'User created successfully. Please check your email to verify your account.' });
        } catch (error) {
            console.error('Error during sign-up:', error);
            res.status(500).json({ errors: [{ message: 'Server error' }] });
        }
    }
);

module.exports = router;
