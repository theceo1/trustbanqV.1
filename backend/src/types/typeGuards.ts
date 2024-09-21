// backend/src/types/typeGuards.ts
import { User } from './user.types';
import { Wallet } from './wallet.types';

export function isUser(data: any): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' && // Check if 'id' is a string
    typeof data.email === 'string' && // Check if 'email' is a string
    typeof data.password === 'string' && // Check if 'password' is a string
    typeof data.name === 'string' && // Check if 'name' is a string
    typeof data.created_at === 'string' && // Check if 'created_at' is a string
    (typeof data.googleId === 'string' || data.googleId === undefined) // Check if 'googleId' is a string or undefined
  );
}

export function isWallet(data: any): data is Wallet {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' && // Check if 'id' is a string
    typeof data.userId === 'string' && // Check if 'userId' is a string
    typeof data.balance === 'number' // Check if 'balance' is a number
  );
}