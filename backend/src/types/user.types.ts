export interface User {
    id: string; // or whatever your ID type is
    email: string;
    password: string;
    name?: string;
    balance: number;
    googleId?: string;
  }