// verifyEmail.js
import express from 'express';
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
  res.send('Email verification route working!');
});

// Export the router
export default router;
