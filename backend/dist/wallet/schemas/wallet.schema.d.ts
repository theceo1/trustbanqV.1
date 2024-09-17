export declare class Wallet {
    userId: string;
    balance: number;
    constructor(userId: string, balance?: number);
    save(): Promise<null>;
}
