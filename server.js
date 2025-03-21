import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import signupRouter from './routes/signup.js';
import verifyEmailRouter from './routes/verifyEmail.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Allow all origins (for development)
app.use(cors());
app.options('*', cors()); // Handle preflight requests

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (optional, in case you have frontend files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data (for demo purposes)
let likesData = {};
let commentsData = {};

// Default homepage route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Likes endpoints
app.get('/api/likes/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const data = likesData[pageId] || { isLiked: false, likeCount: 0 };
  res.json(data);
});

app.post('/api/likes/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const { isLiked, likeCount } = req.body;
  likesData[pageId] = { isLiked, likeCount };
  res.status(200).json({ message: 'Like data updated successfully' });
});

// Comments endpoints
app.get('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const comments = commentsData[pageId] || [];
  res.json(comments);
});

app.post('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const { user, text } = req.body;
  if (!commentsData[pageId]) {
    commentsData[pageId] = [];
  }
  commentsData[pageId].push({ user, text });
  res.status(200).json({ message: 'Comment added successfully' });
});

// Use the routers
app.use('/api', signupRouter);
app.use('/api', verifyEmailRouter);
app.use('/auth', authRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
