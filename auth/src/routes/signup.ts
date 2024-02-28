// Import required modules
import express from 'express';

// Create an express router
const router = express.Router();

/**
 * Router.post call
 */
router.post('/api/users/signup', (req, res) => {
  res.send('Sign up.');
});

// Export the router
export { router as signupRouter }
