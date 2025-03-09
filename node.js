const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/likeSystem', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

// Define User and Like models
const User = mongoose.model('User', new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
}));

const Like = mongoose.model('Like', new mongoose.Schema({
    imageId: { type: String, required: true },
    userId: { type: String, required: true },
}));

// Like endpoint
app.post('/like', async (req, res) => {
    const { userId, imageId } = req.body;

    if (!userId || !imageId) {
        return res.status(400).json({ error: 'Missing userId or imageId' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if the user has already liked this image
        const existingLike = await Like.findOne({ userId, imageId });
        if (existingLike) {
            return res.status(400).json({ error: 'User has already liked this image' });
        }

        // Save the like
        const like = new Like({ userId, imageId });
        await like.save();

        // Count total likes for the image
        const totalLikes = await Like.countDocuments({ imageId });

        res.json({ success: true, newLikeCount: totalLikes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server running on port 4000');
});
