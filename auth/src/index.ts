// Import required modules
import express from 'express';
import { json } from 'body-parser';

// Create an express application
const app = express();

// Parse JSON via body-parser middleware
app.use(json());

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
