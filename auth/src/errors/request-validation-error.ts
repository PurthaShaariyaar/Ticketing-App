// Import required modules
import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

/**
 * Create class for RequestValidationError that extends the Error class
 * Props -> statusCode
 * Call super -> since extends Error class
 * TS extends class -> Object.setPrototypeOf
 * Methods -> serailizeErrors
 */
export class RequestValidationError extends CustomError {

  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters.');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path }
      }
      return { message: error.msg }
    });
  }
}
