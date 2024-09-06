import { Document } from 'mongoose';
export declare class Wallet extends Document {
    userId: string;
    balance: number;
}
export declare const WalletSchema: import("mongoose").Schema<Wallet, import("mongoose").Model<Wallet, any, any, any, Document<unknown, any, Wallet> & Wallet & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Wallet, Document<unknown, {}, import("mongoose").FlatRecord<Wallet>> & import("mongoose").FlatRecord<Wallet> & Required<{
    _id: unknown;
}>>;
