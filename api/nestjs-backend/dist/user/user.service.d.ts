import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: any): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
