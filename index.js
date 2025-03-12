// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const FB = require('fb'); // Facebook SDK for Node.js

const app = express();
const port = 3000;
const cors = require('cors');

const allowedOrigins = [
    'http://127.0.0.1:4000',  // Local frontend for development
    'https://www.arthurross.nl'  // Production frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies/auth headers
}));


app.use(bodyParser.json()); // To parse incoming JSON requests

// Simulated database for storing likes (In a real app, you'd use a database)
const likeData = {
    'image1': { likeCount: 0, usersLiked: [] },
    'image2': { likeCount: 0, usersLiked: [] },
};

// Route to get like count for an image
app.get('/api/likes/:imageId', (req, res) => {
    const { imageId } = req.params;
    if (likeData[imageId]) {
        return res.json(likeData[imageId]);
    }
    return res.status(404).send({ message: 'Image not found' });
});

// Route to like or unlike an image
app.post('/api/likes/:imageId', (req, res) => {
    const { imageId } = req.params;
    const { userId, isLiked } = req.body;

    if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
    }

    if (likeData[imageId]) {
        const usersLiked = likeData[imageId].usersLiked;
        
        // Like the image
        if (isLiked) {
            if (!usersLiked.includes(userId)) {
                usersLiked.push(userId);
                likeData[imageId].likeCount++;
            }
        } 
        // Unlike the image
        else {
            const index = usersLiked.indexOf(userId);
            if (index !== -1) {
                usersLiked.splice(index, 1);
                likeData[imageId].likeCount--;
            }
        }
        return res.json({ likeCount: likeData[imageId].likeCount });
    }
    return res.status(404).send({ message: 'Image not found' });
});

// Route to verify the Facebook token
app.post('/api/facebook-login', (req, res) => {
    const { accessToken } = req.body;

    // Verify the token with Facebook Graph API
    FB.api('me', { fields: 'id,name,email', access_token: accessToken }, (response) => {
        if (!response || response.error) {
            return res.status(400).send({ message: 'Error verifying Facebook token' });
        }
        
        // Successfully verified the token; you can now use the Facebook user ID (response.id)
        const userId = response.id;
        res.json({ message: 'Facebook login successful', userId });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
