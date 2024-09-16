import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getWallet(userId: string): Promise<import("../types/wallet.types").Wallet | null>;
    updateBalance(userId: string, amount: number): Promise<import("../types/wallet.types").Wallet | null>;
}
