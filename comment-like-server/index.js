const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: 'http://127.0.0.1:4000',
    methods: ['GET', 'POST'], // Specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers if needed
}));
app.use(express.json()); // Replaced bodyParser with express.json()

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to handle adding a like
app.post('/like', (req, res) => {
    const { userId, imageId } = req.body;

    if (!userId || !imageId) {
        return res.status(400).json({ error: 'userId and imageId are required' });
    }

    const query = `INSERT INTO likes (userId, imageId, isLiked, likeCount) VALUES (?, ?, true, 1)
                   ON DUPLICATE KEY UPDATE isLiked = true, likeCount = likeCount + 1`;
    db.query(query, [userId, imageId], (err, result) => {
        if (err) {
            console.error('Error inserting like:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Like added successfully' });
    });
});

// Route to handle unliking an image
app.post('/unlike', (req, res) => {
    const { userId, imageId } = req.body;

    if (!userId || !imageId) {
        return res.status(400).json({ error: 'userId and imageId are required' });
    }

    const query = `UPDATE likes SET isLiked = false, likeCount = GREATEST(likeCount - 1, 0) 
                   WHERE userId = ? AND imageId = ?`;
    db.query(query, [userId, imageId], (err, result) => {
        if (err) {
            console.error('Error updating like:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Like removed successfully' });
    });
});

// Route to handle updating likes (toggles like status)
app.post('/likes/:imageId', (req, res) => {
    const { userId, isLiked } = req.body;
    const { imageId } = req.params;

    if (!userId || !imageId || isLiked === undefined) {
        return res.status(400).json({ error: 'userId, imageId, and isLiked are required' });
    }

    const query = `INSERT INTO likes (userId, imageId, isLiked, likeCount) 
                   VALUES (?, ?, ?, 1) 
                   ON DUPLICATE KEY UPDATE isLiked = ?, likeCount = CASE WHEN isLiked = ? THEN likeCount ELSE likeCount + 1 END`;
    db.query(query, [userId, imageId, isLiked, isLiked, !isLiked], (err, result) => {
        if (err) {
            console.error('Error inserting or updating like:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Like status updated successfully' });
    });
});

// Get like count for an image
app.get('/likes/:imageId', (req, res) => {
    const { imageId } = req.params;

    const query = `SELECT COUNT(*) AS likeCount FROM likes WHERE imageId = ? AND isLiked = 1`;
    db.query(query, [imageId], (err, results) => {
        if (err) {
            console.error('Error fetching likes:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ imageId, likeCount: results[0].likeCount });
    });
});

// Route to handle fetching likes for a specific page
app.get('/api/likes/:pageId', (req, res) => {
    const { pageId } = req.params;
    
    const query = `SELECT COUNT(*) AS likeCount FROM likes WHERE imageId = ? AND isLiked = 1`;
    db.query(query, [pageId], (err, results) => {
        if (err) {
            console.error('❌ MySQL Error:', err.code, err.sqlMessage);
            return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({ pageId, likeCount: results[0].likeCount });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
