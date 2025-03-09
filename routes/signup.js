// signup.js
import express from 'express';

const router = express.Router();

// Your routes here
router.post('/signup', (req, res) => {
  res.send('Signup route');
});

// Export the router as default
export default router;
