// Import required modules
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

// Create an express application
const app = express();

// Parse JSON via body-parser middleware
app.use(json());

/**
 * Associate all routes with express app
 */
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
