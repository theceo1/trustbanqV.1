import { Model } from 'mongoose';
import { Wallet } from './schemas/wallet.schema';
export declare class WalletService {
    private walletModel;
    constructor(walletModel: Model<Wallet>);
    findByUserId(userId: string): Promise<Wallet | null>;
    create(userId: string): Promise<Wallet>;
    updateBalance(userId: string, amount: number): Promise<Wallet | null>;
}
