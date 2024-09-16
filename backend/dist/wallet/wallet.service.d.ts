import { Wallet } from '../types/wallet.types';
export declare class WalletService {
    findByUserId(userId: string): Promise<Wallet | null>;
    create(userId: string): Promise<Wallet>;
    updateBalance(userId: string, amount: number): Promise<Wallet | null>;
}
