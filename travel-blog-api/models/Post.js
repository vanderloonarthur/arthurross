const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Post image
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ text: String, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
