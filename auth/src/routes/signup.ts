// Import required modules
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

// Create an express router
const router = express.Router();

/**
 * Router.post for user sign up
 * Use express validator { body } as a middleware for validation
 * Get the errors via validationRequest
 * Check if errors !empty -> if so -> send a status of 400 and send errors back as array
 * Extract the content from the body -> email, password = req.body;
 * Check if user email already exists -> await User.findOne -> if so return email exists
 * Call User.build and assign the extracted props to a user constant
 * Save to MongoDB -> await user.save()
 * After user created -> send status 201 and user document
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
  async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email already in use.');
  }

  const user = User.build({ email, password });
  await user.save();

  res.status(201).send(user);
});

// Export the router
export { router as signupRouter }
