// Import required modules
import express from 'express';

// Create an express router
const router = express.Router();

/**
 * Router.post call
 */
router.post('/api/users/signout', (req, res) => {
  res.send('Sign out.')
});

// Export the router
export { router as signoutRouter }
