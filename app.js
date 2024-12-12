const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;  // You can change this port number

// Middlewares
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming JSON requests

// In-memory storage for likes and comments (use a database for production)
const comments = [];
const likes = {
  isLiked: false,
  likeCount: 0
};

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Get comments
app.get('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  // Filter or fetch comments based on pageId if needed
  res.json(comments.filter(comment => comment.pageId === pageId));
});

// Post a new comment
app.post('/api/comments/:pageId', (req, res) => {
  const { name, text } = req.body;
  const pageId = req.params.pageId;

  if (name && text) {
    const newComment = { name, text, pageId };
    comments.push(newComment);  // Add comment to in-memory storage
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ error: 'Name and text are required.' });
  }
});

// Get like status and count
app.get('/api/likes/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  // Here, we're just sending the same like status for simplicity
  res.json(likes);
});

// Post like status
app.post('/api/likes/:pageId', (req, res) => {
  const { isLiked, likeCount } = req.body;
  const pageId = req.params.pageId;

  // Update the like status and count
  likes.isLiked = isLiked;
  likes.likeCount = likeCount;

  res.status(200).json(likes);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
