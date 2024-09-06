import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async findByUserId(userId: string): Promise<Wallet | null> {
    return this.walletModel.findOne({ userId }).exec();
  }

  async create(userId: string): Promise<Wallet> {
    const createdWallet = new this.walletModel({ userId, balance: 0 });
    return createdWallet.save();
  }

  async updateBalance(userId: string, amount: number): Promise<Wallet | null> {
    return this.walletModel.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true }
    ).exec();
  }
}
