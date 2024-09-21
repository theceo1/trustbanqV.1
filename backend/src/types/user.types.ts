// backend/src/types/user.types.ts
export interface User {
    id: string; // or whatever your ID type is
    email: string;
    password: string;
    name: string;
    created_at: string; // Assuming created_at is a string (ISO date format)
    googleId?: string; // Optional field for Google authentication
}