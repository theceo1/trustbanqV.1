import { Schema, Document } from 'mongoose';
export interface User extends Document {
    email: string;
    password: string;
    name?: string;
    balance: number;
    googleId?: string;
}
declare const UserSchema: Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}>>;
export declare const UserModel: import("mongoose").Model<User, {}, {}, {}, Document<unknown, {}, User> & User & Required<{
    _id: unknown;
}>, any>;
export { UserSchema };
