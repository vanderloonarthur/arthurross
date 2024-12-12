const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors()); // This is the CORS setup

app.use(express.json());

let likes = {
  'Edinburgh.md': { isLiked: false, likeCount: 0 }
};

let comments = {
  'Edinburgh.md': [
    { name: 'John', text: 'Great post!' },
    { name: 'Alice', text: 'Very informative.' }
  ]
};

// Route to get likes
app.get('/api/likes/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  if (likes[pageId]) {
    res.json(likes[pageId]);
  } else {
    res.status(404).json({ error: 'Page not found' });
  }
});

// Route to update likes
app.post('/api/likes/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const { isLiked, likeCount } = req.body;
  if (likes[pageId]) {
    likes[pageId] = { isLiked, likeCount };
    res.json(likes[pageId]);
  } else {
    res.status(404).json({ error: 'Page not found' });
  }
});

// Route to get comments
app.get('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  if (comments[pageId]) {
    res.json(comments[pageId]);
  } else {
    res.status(404).json({ error: 'Page not found' });
  }
});

// Route to post a comment
app.post('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const { name, text } = req.body;
  if (!name || !text) {
    return res.status(400).json({ error: 'Name and text are required' });
  }
  if (comments[pageId]) {
    comments[pageId].push({ name, text });
    res.json(comments[pageId]);
  } else {
    res.status(404).json({ error: 'Page not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
