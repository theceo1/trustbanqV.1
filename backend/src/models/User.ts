// backend/src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  balance: number; // Add the balance field here
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  googleId?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String},
  balance: { type: Number, default: 0 },
  googleId: { type: String, unique: true },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
  return token;
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
