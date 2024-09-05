// backend/src/models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  balance: number;
  generateAuthToken(): string;
  googleId?: string;
  name?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Consider hashing passwords in production
  balance: { type: Number, default: 0 },
  googleId: { type: String, sparse: true },
  name: { type: String },
});

// Generate JWT token
userSchema.methods.generateAuthToken = function (): string {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set in environment variables');
    throw new Error('JWT_SECRET is not configured');
  }

  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
  console.log(`JWT token generated for user ID: ${this._id}`);
  return token;
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;

