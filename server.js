const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Set up SQLite database
const db = new sqlite3.Database("./data.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  }
});

// Create tables for likes and comments if not already created
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS likes (pageId TEXT PRIMARY KEY, likeCount INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS comments (pageId TEXT, commentId INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
});

// Get likes for a specific post
app.get("/api/likes", (req, res) => {
  const { pageId } = req.query;
  db.get("SELECT * FROM likes WHERE pageId = ?", [pageId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(row || { pageId, likeCount: 0 });
  });
});

// Update likes for a specific post
app.post("/api/likes", (req, res) => {
  const { pageId, likeCount } = req.body;
  db.run(
    "INSERT OR REPLACE INTO likes (pageId, likeCount) VALUES (?, ?)",
    [pageId, likeCount],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ pageId, likeCount });
    }
  );
});

// Get comments for a specific post
app.get("/api/comments", (req, res) => {
  const { pageId } = req.query;
  db.all("SELECT * FROM comments WHERE pageId = ? ORDER BY createdAt DESC", [pageId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows || []);
  });
});

// Add a comment to a specific post
app.post("/api/comments", (req, res) => {
  const { pageId, text } = req.body;
  db.run("INSERT INTO comments (pageId, text) VALUES (?, ?)", [pageId, text], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ commentId: this.lastID, pageId, text });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
