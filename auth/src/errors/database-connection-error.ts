import { CustomError } from './custom-error';

/**
 * Create a DatabaseConnectionError class that extends CustomError class
 * Props -> statusCode and reason
 * Call super -> since extends Error class
 * TS extends class -> Object.setPrototypeOf
 * Methods -> constructor and serializeErrors
 */
export class DatabaseConnectionError extends CustomError {

  statusCode = 500;
  reason = 'Error connecting to database.';

  constructor() {
    super('Error connecting to database.');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.reason }
    ];
  }
}
