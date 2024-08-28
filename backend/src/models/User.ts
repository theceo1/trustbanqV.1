//backend/src/models/Users.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  balance: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  googleId?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  balance: { type: Number, default: 0 },
  googleId: { type: String, unique: true },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!this.password) {
    console.log('User has no password set');
    return false;
  }
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log('Password comparison result:', isMatch);
  return isMatch;
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
  return token;
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;