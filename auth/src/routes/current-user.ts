// Import required modules
import express from 'express';

// Create an express router
const router = express.Router();

/**
 * Router.get call
 */
router.get('/api/users/currentuser', (req, res) => {
  res.send('Current user.');
});

// Export the router
export { router as currentUserRouter }
