const express = require("express");
const app = express();
const port = 4000;

app.use(express.json()); // For parsing application/json

// Mock data for likes and comments
let likeData = { isLiked: false, likeCount: 0 };
let commentsData = [];

app.post('/api/likes', (req, res) => {
  const { isLiked, likeCount } = req.body;
  likeData.isLiked = isLiked;
  likeData.likeCount = likeCount;
  res.json(likeData); // Send back the updated like data
});

app.get('/api/likes', (req, res) => {
  res.json(likeData); // Send back the current like data
});

app.post('/api/comments', (req, res) => {
  const { user, text } = req.body;
  const newComment = { user, text };
  commentsData.push(newComment); // Save the new comment
  res.json(commentsData); // Send back the updated comments
});

app.get('/api/comments', (req, res) => {
  res.json(commentsData); // Send back the list of comments
});

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
