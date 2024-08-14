// backend/src/services/walletService.ts
import User, { IUser } from '../models/User';

export const getBalance = async (userId: string): Promise<number> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user.balance;
};
