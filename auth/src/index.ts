// Import required modules
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';


// Create an express application
const app = express();

// Ensure express is aware that there is a proxy behind ingress nginx so trust traffic as secure
app.set('trust proxy', true);

// Parse JSON via body-parser middleware
app.use(json());

/**
 * Cookie session middleware
 * Configuration object has 2 props -> signed and secure
 */
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

/**
 * Associate all routes with express app
 */
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

// Throw a new error if route not found -> it will send to error handling middleware
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Format the error received in a specific format -> errorHandler
app.use(errorHandler);

/**
 * Connect to mongoose
 * Mongoose will connect to a MongoDB url
 * The url should be the k8s mongo service name with the port number with the actual database name
 * If you create your own database name -> '/auth' -> mongoose will automatically create it
 * Use try catch block -> try to connect to db -> catch error if connection fails
 * Only start the server and listen on port 3000 after connection is successful
 */
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000.');
  });
};

start();
