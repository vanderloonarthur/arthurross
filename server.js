const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/travel_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error: ', err));

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Travel Blog API!');
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const postRoutes = require('./routes/posts');

app.use('/api/posts', postRoutes);
