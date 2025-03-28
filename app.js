const express = require('express');
const bodyParser = require('body-parser');
const signupRouter = require('./api/signup');
const loginRouter = require('./api/login');

const app = express();
const port = 8443;

// Mock data storage
let likesData = {};
let commentsData = {};

app.use(bodyParser.json());
app.use(express.static('public'));  // Assuming static files are in the 'public' folder

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the signup and login routes
app.use('/api', signupRouter);
app.use('/api', loginRouter);

app.get('/api/likes/:pageId', (req, res) => {
  const { pageId } = req.params;
  res.json({ likeCount: 10, isLiked: false });  // Replace with actual data for that pageId
});

app.post('/api/likes/:pageId', (req, res) => {
  const { pageId } = req.params;
  const { isLiked, likeCount } = req.body;
  // Update like data for specific pageId
  res.json({ likeCount, isLiked });
});


// Get comments data
app.get('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const pageComments = commentsData[pageId] || [];
  res.json(pageComments);
});

// Post a new comment
app.post('/api/comments/:pageId', (req, res) => {
  const pageId = req.params.pageId;
  const { user, text } = req.body;

  if (!commentsData[pageId]) {
    commentsData[pageId] = [];
  }

  commentsData[pageId].push({ user, text });
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
