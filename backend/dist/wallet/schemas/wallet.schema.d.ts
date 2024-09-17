// backend/dist/wallet/schemas/wallet.schema.d.ts
export class Wallet {
    userId: string;
    balance: number;

    constructor(userId: string, balance?: number);
}
