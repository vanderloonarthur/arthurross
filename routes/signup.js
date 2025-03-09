// signup.js
import express from 'express';
const router = express.Router();

// Define your routes for signup here
router.post('/', (req, res) => {
  res.send('Signup route');
});

// Export the router
export default router;
