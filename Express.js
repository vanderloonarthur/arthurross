// Assuming you're using Express.js
const express = require('express');
const app = express();
const port = 4000;

// Simulated in-memory data for likes (You could replace this with a database)
let likesData = {
  pageId: {
    isLiked: false,
    likeCount: 0,
  },
};

// Endpoint for getting and updating likes
app.get('/api/likes/:pageId', (req, res) => {
  const { pageId } = req.params;
  if (likesData[pageId]) {
    return res.json(likesData[pageId]);
  }
  res.status(404).json({ error: 'Page not found' });
});

app.post('/api/likes/:pageId', express.json(), (req, res) => {
  const { pageId } = req.params;
  const { isLiked, likeCount } = req.body;

  if (likesData[pageId]) {
    likesData[pageId] = { isLiked, likeCount };
    return res.status(200).json(likesData[pageId]);
  }

  res.status(404).json({ error: 'Page not found' });
});

// Simulated in-memory data for comments
let commentsData = {
  pageId: [],
};

// Endpoint for getting and posting comments
app.get('/api/comments/:pageId', (req, res) => {
  const { pageId } = req.params;
  if (commentsData[pageId]) {
    return res.json(commentsData[pageId]);
  }
  res.status(404).json({ error: 'Page not found' });
});

app.post('/api/comments/:pageId', express.json(), (req, res) => {
  const { pageId } = req.params;
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).json({ error: 'User and text are required' });
  }

  if (!commentsData[pageId]) {
    commentsData[pageId] = [];
  }

  const newComment = { user, text };
  commentsData[pageId].push(newComment);
  return res.status(201).json(newComment);
});

// Serve static files if needed
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
