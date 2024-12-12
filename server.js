const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // You might need this if you're working with a different frontend domain/port

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (if needed)
app.use(bodyParser.json()); // Parse JSON data from request body

// In-memory data for comments and likes
const commentsData = {}; // { pageId: [comments] }
const likesData = {}; // { pageId: { isLiked: true/false, likeCount: number } }

// Endpoint to fetch comments for a specific page
app.get('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  // Return comments for the pageId or an empty array if none exist
  res.json(commentsData[pageId] || []);
});

// Endpoint to post a new comment
app.post('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const newComment = req.body;

  // Ensure commentsData for pageId exists
  if (!commentsData[pageId]) {
    commentsData[pageId] = [];
  }

  // Push new comment to the page's comment array
  commentsData[pageId].push(newComment);
  res.status(201).send('Comment added');
});

// Endpoint to get like status and count for a page
app.get('/api/likes/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  // Return like data for pageId, or a default object if not found
  res.json(likesData[pageId] || { isLiked: false, likeCount: 0 });
});

// Endpoint to update like status and count
app.post('/api/likes/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const { isLiked, likeCount } = req.body;

  // Save like data for the page
  likesData[pageId] = { isLiked, likeCount };
  res.status(201).send('Like data updated');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
