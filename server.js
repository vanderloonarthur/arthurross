const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // To parse JSON body data

let comments = [
  { name: 'John', text: 'Great post!' },
  { name: 'Alice', text: 'Very informative.' }
];
let likeCount = 0;
let isLiked = false;

// API to get all comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// API to post a new comment
app.post('/api/comments', (req, res) => {
  const { name, text } = req.body;
  if (!name || !text) {
    return res.status(400).json({ error: 'Name and text are required' });
  }
  comments.push({ name, text });
  res.json(comments);
});

// API to get like data
app.get('/api/likes', (req, res) => {
  res.json({ likeCount, isLiked });
});

// API to post like data
app.post('/api/likes', (req, res) => {
  const { isLiked: newLikeStatus, likeCount: newLikeCount } = req.body;
  isLiked = newLikeStatus;
  likeCount = newLikeCount;
  res.json({ likeCount, isLiked });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'posts/Edinburgh.md'));
});
