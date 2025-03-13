const express = require('express');
const mysql = require('mysql2/promise'); // Use the promise-based version
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: ['http://localhost:3000', 'https://www.arthurross.nl'], // Allow local dev & production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // Allow cookies if needed
}));


app.use(express.json()); // Replaced bodyParser with express.json()

// Create MySQL connection using promise-based version
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/likes/:imageId', async (req, res) => {
    const { userId, isLiked } = req.body;
    const { imageId } = req.params;

    if (!userId || !imageId || isLiked === undefined) {
        return res.status(400).json({ error: 'userId, imageId, and isLiked are required' });
    }

    try {
        // Check if the user already liked the image
        const [existingLikes] = await db.query(`SELECT isLiked FROM likes WHERE userId = ? AND imageId = ?`, [userId, imageId]);

        if (existingLikes.length > 0) {
            if (existingLikes[0].isLiked !== isLiked) {
                // Toggle like status only if it actually changes
                await db.query(
                    `UPDATE likes SET isLiked = ?, likeCount = CASE WHEN ? THEN likeCount + 1 ELSE GREATEST(likeCount - 1, 0) END 
                     WHERE userId = ? AND imageId = ?`,
                    [isLiked, isLiked, userId, imageId]
                );
            }
        } else {
            // Insert a new like
            await db.query(`INSERT INTO likes (userId, imageId, isLiked, likeCount) VALUES (?, ?, ?, 1)`, [userId, imageId, isLiked]);
        }

        res.json({ message: 'Like status updated successfully' });
    } catch (err) {
        console.error('❌ Error updating like:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/unlike', async (req, res) => {
    const { userId, imageId } = req.body;

    if (!userId || !imageId) {
        return res.status(400).json({ error: 'userId and imageId are required' });
    }

    try {
        // Check current like status
        const [existingLikes] = await db.query(`SELECT isLiked FROM likes WHERE userId = ? AND imageId = ?`, [userId, imageId]);

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


// Route to handle updating likes (toggles like status)
app.post('/likes/:imageId', async (req, res) => {
    const { userId, isLiked } = req.body;
    const { imageId } = req.params;

    if (!userId || !imageId || isLiked === undefined) {
        return res.status(400).json({ error: 'userId, imageId, and isLiked are required' });
    }

    const query = `INSERT INTO likes (userId, imageId, isLiked, likeCount) 
                   VALUES (?, ?, ?, 1) 
                   ON DUPLICATE KEY UPDATE isLiked = ?, likeCount = CASE WHEN isLiked = ? THEN likeCount ELSE likeCount + 1 END`;

    try {
        await db.query(query, [userId, imageId, isLiked, isLiked, !isLiked]);
        res.json({ message: 'Like status updated successfully' });
    } catch (err) {
        console.error('Error inserting or updating like:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/likes/:imageId', async (req, res) => {
    const { imageId } = req.params;

    try {
        const [results] = await db.query(
            `SELECT SUM(isLiked) AS likeCount FROM likes WHERE imageId = ?`,
            [imageId]
        );

        res.json({ imageId, likeCount: results[0].likeCount || 0 });
    } catch (err) {
        console.error('❌ Error fetching likes:', err);
        res.status(500).json({ error: 'Database error' });
    }
});


// Route to handle fetching likes for a specific page
app.get('/api/likes/:pageId', async (req, res) => {
    const { pageId } = req.params;

    const query = `SELECT COUNT(*) AS likeCount FROM likes WHERE imageId = ? AND isLiked = 1`;

    try {
        const [results] = await db.query(query, [pageId]);
        res.json({ pageId, likeCount: results[0].likeCount });
    } catch (err) {
        console.error('❌ MySQL Error:', err.code, err.sqlMessage);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start server
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
