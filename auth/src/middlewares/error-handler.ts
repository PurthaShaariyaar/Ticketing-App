// Import required modules
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

/**
 * errorHandler middleware
 * if type checks err instance of each Error
 * return the status and send the serailizeErrors by calling it
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong.' }]
  });
};
