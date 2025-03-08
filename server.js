const express = require('express');
const cors = require('cors');
const app = express();
const signupRouter = require('./signup');
const verifyEmailRouter = require('./verifyEmail');
const authRoutes = require('./routes/auth'); // Ensure correct path
const port = 4000;

// Allow all origins (for development)
app.use(cors());

// Handle preflight requests for all routes
app.options('*', cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data (for demo purposes)
let likesData = {};
let commentsData = {};

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

app.use('/api', signupRouter);
app.use('/api', verifyEmailRouter);
app.use('/auth', authRoutes); // Include auth routes

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
