const express = require('express');
const https = require('https');
const fs = require('fs');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// SSL certificates for HTTPS
const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
const ca = fs.readFileSync('path/to/ca-cert.pem', 'utf8'); // Optional, if you have CA cert

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,  // Optional
};

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://www.arthurross.nl'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());

// MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// ✅ Route: Like an image
app.post('/likes/:imageId', async (req, res) => {
    const { userId, isLiked } = req.body;
    const { imageId } = req.params;

    if (!userId || !imageId || isLiked === undefined) {
        return res.status(400).json({ error: 'userId, imageId, and isLiked are required' });
    }

    try {
        const [existingLikes] = await db.query(
            `SELECT isLiked FROM likes WHERE userId = ? AND imageId = ?`,
            [userId, imageId]
        );

        if (existingLikes.length > 0) {
            // Update if already liked
            await db.query(
                `UPDATE likes SET isLiked = ?, likeCount = CASE WHEN ? THEN likeCount + 1 ELSE GREATEST(likeCount - 1, 0) END 
                 WHERE userId = ? AND imageId = ?`,
                [isLiked, isLiked, userId, imageId]
            );
        } else {
            // Insert new like
            await db.query(
                `INSERT INTO likes (userId, imageId, isLiked, likeCount) VALUES (?, ?, ?, 1)`,
                [userId, imageId, isLiked]
            );
        }

        res.json({ message: 'Like status updated successfully' });
    } catch (err) {
        console.error('❌ Error updating like:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ✅ Route: Fetch like count for an image
app.get('/likes/:imageId', async (req, res) => {
    const { imageId } = req.params;

    try {
        const [results] = await db.query(
            `SELECT COUNT(*) AS likeCount FROM likes WHERE imageId = ? AND isLiked = 1`,
            [imageId]
        );

        res.json({ imageId, likeCount: results[0].likeCount || 0 });
    } catch (err) {
        console.error('❌ Error fetching likes:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ✅ Route: Home Page
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// ✅ Start the server
https.createServer(credentials, app).listen(PORT, () => {
    console.log(`🚀 Server running on https://localhost:${PORT}`);
});
