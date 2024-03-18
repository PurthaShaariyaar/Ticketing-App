// Import required modules
import mongoose from 'mongoose';
import { Password } from '../services/password';

/**
 * User attributes interface
 * Describes the props required to create a new user
 */
interface UserAttrs {
  email: string;
  password: string;
}

/**
 * User document interface
 * Describes the props that a User Document has
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

/**
 * User model interface
 * Describes the props that a User Model has
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * Create a user schema
 * Props -> email and password -> mongoose will have both required
 * Methods -> toJSON -> update how JSON objects are returned
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

/**
 * Middleware function implemented in mongoose
 * Anytime an attempt is made to save a user document to MongoDB -> this function will execute
 * Not an arrow function -> need to create a normal function to use 'this' keyword
 * this keyword is referencing the user document, not any props or methods in current file
 * Use this.isModified to ensure if the password is already hashed its not hashed again
 * Hash the password by calling Password.toHash -> get password from user doc -> this.get
 * Call done() after everything is completed
 */
userSchema.pre('save', async function(done){
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

/**
 * Function to ensure type checking of user schema attributes
 * Receives an argument of attrs with the type interface UserAttrs
 */
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

/**
 * Create a User model defined by the userSchema structure
 */
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Export the User model
export { User };
