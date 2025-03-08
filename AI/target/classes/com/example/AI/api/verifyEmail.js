const express = require('express');
const router = express.Router();
const userRepository = require('../db/userRepository');

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const user = await userRepository.findUserByVerificationToken(token);
        if (!user) {
            return res.status(400).json({ errors: [{ message: 'Invalid or expired verification token' }] });
        }

        // Update the user's status to verified
        await userRepository.verifyUser(user.id);

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ errors: [{ message: 'Server error' }] });
    }
});

module.exports = router;