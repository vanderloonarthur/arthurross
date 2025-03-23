import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import signupRouter from './routes/signup.js';
import verifyEmailRouter from './routes/verifyEmail.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'travel_blog',
});

console.log("Connected to MySQL Database");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Default homepage route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Fetch likes for a page
app.get('/api/likes/:pageId', async (req, res) => {
    const { pageId } = req.params;
    try {
        const [rows] = await db.execute('SELECT like_count FROM likes WHERE page_id = ?', [pageId]);
        if (rows.length > 0) {
            res.json({ likeCount: rows[0].like_count });
        } else {
            res.json({ likeCount: 0 });
        }
    } catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update likes for a page
app.post('/api/likes/:pageId', async (req, res) => {
    const { pageId } = req.params;
    const { isLiked } = req.body;

    try {
        const [rows] = await db.execute('SELECT like_count FROM likes WHERE page_id = ?', [pageId]);
        let likeCount = rows.length > 0 ? rows[0].like_count : 0;
        likeCount = isLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

        await db.execute(
            'INSERT INTO likes (page_id, like_count) VALUES (?, ?) ON DUPLICATE KEY UPDATE like_count = ?',
            [pageId, likeCount, likeCount]
        );

        res.json({ likeCount });
    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Use additional routes
app.use('/api', signupRouter);
app.use('/api', verifyEmailRouter);
app.use('/auth', authRoutes);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
