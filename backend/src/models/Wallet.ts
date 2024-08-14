// backend/src/models/Wallet.ts
import mongoose, { Document } from 'mongoose';

interface IWallet extends Document {
  userId: string;
  balance: number;
}

const walletSchema = new mongoose.Schema<IWallet>({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
});

const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);
export default Wallet;
