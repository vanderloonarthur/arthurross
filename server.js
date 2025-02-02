const express = require('express');
const app = express();
const port = 4000;

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
