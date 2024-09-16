// backend/src/wallet/wallet.service.ts
import { Injectable } from '@nestjs/common';
import { supabaseInstance } from '../supabaseClient'; // Import the Supabase client
import { Wallet } from '../types/wallet.types'; // Import the Wallet type
import { isWallet } from '../types/typeGuards'; // Import the type guard

@Injectable()
export class WalletService {
  async findByUserId(userId: string): Promise<Wallet | null> {
    const { data, error } = await supabaseInstance()
      .from('wallets')
      .select('*')
      .eq('userId', userId)
      .single();

    if (error) {
      return null; // Handle error as needed
    }

    if (!isWallet(data)) {
      throw new Error('Invalid wallet data returned from Supabase');
    }

    return data; // Now data is guaranteed to be of type Wallet
  }

  async create(userId: string): Promise<Wallet> {
    const { data, error } = await supabaseInstance()
      .from('wallets')
      .insert({ userId, balance: 0 })
      .single();

    if (error) {
      throw new Error(`Error creating wallet: ${error.message}`);
    }

    if (!isWallet(data)) {
      throw new Error('Invalid wallet data returned from Supabase');
    }

    return data; // Now data is guaranteed to be of type Wallet
  }

  async updateBalance(userId: string, amount: number): Promise<Wallet | null> {
    const { data, error } = await supabaseInstance()
      .from('wallets')
      .update({ balance: amount }) // Update balance directly
      .eq('userId', userId)
      .single();

    if (error) {
      return null; // Handle error as needed
    }

    if (!isWallet(data)) {
      throw new Error('Invalid wallet data returned from Supabase');
    }

    return data; // Now data is guaranteed to be of type Wallet
  }
}