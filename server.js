import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRouter from './routes/signup.js'; // Ensure correct path (with .js extension)
import verifyEmailRouter from './routes/verifyEmail.js'; // Ensure correct path (with .js extension)
import authRoutes from './routes/auth.js'; // Ensure correct path (with .js extension)


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// Use the routers
app.use('/api', signupRouter);
app.use('/api', verifyEmailRouter); // Correctly use the email verification route
app.use('/auth', authRoutes); // Include auth routes

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
