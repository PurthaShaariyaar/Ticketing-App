/**
 * Custom error abstract class extends Error class
 * When implemented on subclasses, ensures subclasses have the correct properties
 * Props (abstract) -> statusCode and serializeErrors
 *
 * Need constructor -> call super and init Object.setPrototypeOf
 */
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[]

}
