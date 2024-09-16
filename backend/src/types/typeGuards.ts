import { User } from './user.types';
import { Wallet } from './wallet.types';

export function isUser(data: any): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'email' in data &&
    'password' in data &&
    'balance' in data
  );
}

export function isWallet(data: any): data is Wallet {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'userId' in data &&
    'balance' in data
  );
}