// Import required modules
import { CustomError } from "./custom-error";

/**
 * BadRequestError extends CustomError class
 * Props -> statusCode
 * Call super() since it extends the CustomError class
 * Constructor has a message arguement
 * Methods -> serializeErrors
 */
export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

