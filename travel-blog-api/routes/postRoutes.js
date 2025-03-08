const express = require("express");
const Post = require("../models/Post");
const upload = require("../middlewares/upload");

const router = express.Router();

// Create Post with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { user, title, description } = req.body;
    const newPost = new Post({
      user,
      title,
      description,
      image: `/uploads/${req.file.filename}`
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
