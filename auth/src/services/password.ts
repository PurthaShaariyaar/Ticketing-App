// Import required modules
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

/**
 * scrypt is a callback function -> incompatible with async await
 * To ensure compatability -> promisify scrypt -> now a promise based implementation
 */
const scryptAsync = promisify(scrypt);

/**
 * Password class primary function to hash password and compare password in MongoDB
 * Has two static methods -> toHash and compare
 * Static methods can be called directly on the class rather than instances of the class
 * toHash method -> uses salt -> calls randomBytes and toString -> creates random string
 * toHash method -> has buffer, buf, has raw data in it when using scrypt
 *
 * compare method -> splits the hashed password and salt of stored password
 * compare method -> same buffer as toHash -> convert it to string and compare with hashedPassword
 */
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
