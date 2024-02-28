// Import required module
import express from 'express';

// Create an express router
const router = express.Router();

/**
 * Router.get call
 */
router.post('/api/users/signin', (req, res) => {
  res.send('Sign in.');
});

// Export the router
export { router as signinRouter }
