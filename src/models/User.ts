import { Schema, models, model } from 'mongoose';

// Define the schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    }
    },
  { timestamps: true }
)

// Prevent model overwrite during hot reload
const User = models.User || model('User', userSchema);
export default User;
