const express = require("express");
const User = require("../models/User");
const upload = require("../middlewares/upload");

const router = express.Router();

// Upload Profile Picture
router.post("/:id/profile-pic", upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.profilePic = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({ message: "Profile picture updated", profilePic: user.profilePic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
