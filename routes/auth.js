// auth.js
import express from 'express';
const router = express.Router();

// Define your routes for auth here
router.get('/', (req, res) => {
  res.send('Auth route');
});

// Export the router
export default router;
