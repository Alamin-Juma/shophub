import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";

// Interface for the User Document
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly type _id
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// User Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// pre means wait for it t happen first before next operation
userSchema.pre<IUser>('save', async function (next) {
  // Only hash password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
}

try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
} catch (error: any) {
    next(error);
}
})

// Define the User Model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
