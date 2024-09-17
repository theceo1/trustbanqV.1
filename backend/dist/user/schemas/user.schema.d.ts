// backend/dist/user/schemas/user.schema.d.ts
export interface User {
    email: string;
    password: string;
    name?: string;
    balance: number;
    googleId?: string;
}
