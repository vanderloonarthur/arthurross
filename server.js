// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const path = require('path');
const { fileURLToPath } = require('url');

// Import routes
const signupRouter = require('./routes/signup');
const verifyEmailRouter = require('./routes/verifyEmail');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

let db;

// Database connection setup using the connection URL
async function connectDB() {
    try {
        // Use the connection URL from environment variables (JAWSDB_URL)
        db = await mysql.createConnection(process.env.JAWSDB_URL);
        console.log("Connected to MySQL Database via JAWSDB_URL");
    } catch (error) {
        console.error("Database connection failed:", error);
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

// Fetch likes for a page
app.get('/api/likes/:pageId', async (req, res) => {
    const { pageId } = req.params;
    try {
        const [rows] = await db.execute('SELECT like_count FROM likes WHERE page_id = ?', [pageId]);
        res.json({ likeCount: rows.length > 0 ? rows[0].like_count : 0 });
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
