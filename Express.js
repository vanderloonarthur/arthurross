const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/travel_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const likeSchema = new mongoose.Schema({
    imageId: String,
    userId: String
});
const Like = mongoose.model("Like", likeSchema);

// Route to like an image
app.post("/api/likes", async (req, res) => {
    const { imageId, userId } = req.body;

    if (!imageId || !userId) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    const existingLike = await Like.findOne({ imageId, userId });

    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        res.json({ message: "Like removed" });
    } else {
        const newLike = new Like({ imageId, userId });
        await newLike.save();
        res.json({ message: "Like added" });
    }
});

// Get total likes for an image
app.get("/api/likes/:imageId", async (req, res) => {
    const count = await Like.countDocuments({ imageId: req.params.imageId });
    res.json({ likeCount: count });
});

app.listen(8443, () => console.log("Server running on port 8443"));
