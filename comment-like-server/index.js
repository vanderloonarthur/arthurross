const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://www.arthurross.nl'], 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// MySQL connection from JawsDB URL
const dbUrl = process.env.JAWSDB_URL;
const db = mysql.createPool({
    host: dbUrl.match(/@(.+?):/)[1],
    user: dbUrl.match(/:\/\/(.*?):/)[1],
    password: dbUrl.match(/:(.*?)@/)[1],
    database: dbUrl.match(/\/(.+)$/)[1],
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

// ✅ Route: Unlike an image
app.post('/unlike', async (req, res) => {
    const { userId, imageId } = req.body;

    if (!userId || !imageId) {
        return res.status(400).json({ error: 'userId and imageId are required' });
    }

    try {
        const [existingLikes] = await db.query(
            `SELECT isLiked FROM likes WHERE userId = ? AND imageId = ?`, 
            [userId, imageId]
        );

        if (existingLikes.length > 0 && existingLikes[0].isLiked) {
            await db.query(
                `UPDATE likes SET isLiked = false, likeCount = GREATEST(likeCount - 1, 0) WHERE userId = ? AND imageId = ?`,
                [userId, imageId]
            );
        }

        res.json({ message: 'Like removed successfully' });
    } catch (err) {
        console.error('❌ Error unliking:', err);
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

// Redirect HTTP to HTTPS in production (for custom domain)
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] === 'http') {
            return res.redirect(301, 'https://' + req.headers.host + req.url);
        }
        return next();
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
