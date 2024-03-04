// Import required modules
import mongoose from 'mongoose';

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
