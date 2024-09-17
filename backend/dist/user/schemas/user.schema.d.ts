export interface User {
    email: string;
    password: string;
    name?: string;
    balance: number;
    googleId?: string;
}
export declare function createUser(user: User): Promise<null>;
