// Import required modules
import { CustomError } from "./custom-error";

/**
 * NotFoundError class extends CustomError
 * Props -> statusCode
 * Require a constructor -> needs super() and Object.setPrototypeOf
 * Methods -> serializeErrors
 */
export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found.');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found.' }]
  }
}
