const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// 🛠️ Fix: Add the missing `/like` route
app.post('/like', (req, res) => {
    const { userId, imageId } = req.body;

    if (!userId || !imageId) {
        return res.status(400).json({ error: 'userId and imageId are required' });
    }

    const query = `INSERT INTO likes (userId, imageId) VALUES (?, ?)`;
    db.query(query, [userId, imageId], (err, result) => {
        if (err) {
            console.error('Error inserting like:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Like added successfully' });
    });
});

// ✅ Get like count for an image
app.get('/likes/:imageId', (req, res) => {
    const { imageId } = req.params;

    const query = `SELECT COUNT(*) AS likeCount FROM likes WHERE imageId = ?`;
    db.query(query, [imageId], (err, results) => {
        if (err) {
            console.error('Error fetching likes:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ imageId, likeCount: results[0].likeCount });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
