// Import required modules
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// Create an express router
const router = express.Router();

/**
 * Router.post for user sign up
 * Use express validator { body } as a middleware for validation
 * Get the errors via validationRequest
 * Check if errors !empty -> if so -> send a status of 400 and send errors back as array
 * Extract the content from the body -> email, password = req.body;
 */
router.post('/api/users/signup',
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  }

  const { email, password } = req.body;

  console.log('Creating a user...');

  res.send({});

});

// Export the router
export { router as signupRouter }
