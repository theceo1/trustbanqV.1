import { User } from '../types/user.types';
export declare class UserService {
    create(createUserDto: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<Partial<User>>;
}
