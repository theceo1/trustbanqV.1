import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name?: string;
  balance: number;
  googleId?: string;
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  balance: { type: Number, required: true },
  googleId: { type: String },
});

export const UserModel = model<User>('User', UserSchema);
export { UserSchema };