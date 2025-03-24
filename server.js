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

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

let db;

// Database connection setup using the connection URL
async function connectDB() {
    try {
        // Use the connection URL from environment variables (JAWSDB_URL)
        if (!process.env.JAWSDB_URL) {
            throw new Error("JAWSDB_URL environment variable is not set");
        }

        db = await mysql.createConnection(process.env.JAWSDB_URL);
        console.log("Connected to MySQL Database via JAWSDB_URL");
    } catch (error) {
        console.error("Database connection failed:", error.message || error);
        process.exit(1); // Exit the app if the database connection fails
    }
}

// Establish the database connection
connectDB();

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

// Fetch if user has liked a page
app.get('/api/likes/:pageId/user/:userId', async (req, res) => {
    const { pageId, userId } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM user_likes WHERE page_id = ? AND user_id = ?', [pageId, userId]);
        res.json({ isLiked: rows.length > 0 });
    } catch (error) {
        console.error("Error fetching user like status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/api/likes/:pageId', async (req, res) => {
    const { pageId } = req.params;
    const { userId, isLiked } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Check if the user already liked this page
        const [existingLikes] = await db.execute('SELECT * FROM user_likes WHERE page_id = ? AND user_id = ?', [pageId, userId]);

        if (isLiked) {
            if (existingLikes.length === 0) {
                // Add new like
                await db.execute('INSERT INTO user_likes (page_id, user_id) VALUES (?, ?)', [pageId, userId]);
                await db.execute('INSERT INTO likes (page_id, like_count) VALUES (?, 1) ON DUPLICATE KEY UPDATE like_count = like_count + 1');
            }
        } else {
            if (existingLikes.length > 0) {
                // Remove like
                await db.execute('DELETE FROM user_likes WHERE page_id = ? AND user_id = ?', [pageId, userId]);
                await db.execute('UPDATE likes SET like_count = GREATEST(0, like_count - 1) WHERE page_id = ?', [pageId]);
            }
        }

        // Fetch updated like count
        const [rows] = await db.execute('SELECT like_count FROM likes WHERE page_id = ?', [pageId]);
        const likeCount = rows.length > 0 ? rows[0].like_count : 0;

        res.json({ likeCount });
    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ error: "Internal Server Error: Unable to update likes" });
    }
});

// Use additional routes for signup, verify email, and authentication
app.use('/api', signupRouter);
app.use('/api', verifyEmailRouter);
app.use('/auth', authRoutes);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Gracefully handle app shutdown and close database connection
process.on('SIGINT', async () => {
    try {
        await db.end();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
    process.exit(0); // Exit the app after closing the connection
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
