const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: String,
    datePosted: { type: Date, default: Date.now },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

module.exports = mongoose.model('Comment', CommentSchema);
