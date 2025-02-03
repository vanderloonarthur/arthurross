const express = require('express');
const cors = require('cors');
const app = express();

const cors = require('cors');
app.use(cors()); // Allow all origins

// Example route
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is some data' });
});

app.listen(8080, () => {
  console.log('Server is running on http://127.0.0.1:8080');
});

app.use(cors({
origin: (origin, callback) => {
  if (allowedOrigins.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'), false);
  }
}
}));