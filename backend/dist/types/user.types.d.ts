export interface User {
    id: string;
    email: string;
    password: string;
    name?: string;
    balance: number;
    googleId?: string;
}
