import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getWallet(userId: string): Promise<import("./schemas/wallet.schema").Wallet | null>;
    updateBalance(userId: string, amount: number): Promise<import("./schemas/wallet.schema").Wallet | null>;
}
