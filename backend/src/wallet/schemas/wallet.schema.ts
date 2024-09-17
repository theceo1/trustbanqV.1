import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://mmrztyzajrvcakmkfkqr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcnp0eXphanJ2Y2FrbWtma3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNzE2MDEsImV4cCI6MjA0MTg0NzYwMX0.yMCOEwNEuVJl5G_NDyM9fDgtIGbH_mJ2fAx8K-q-FYo');

export class Wallet {
  userId: string;
  balance: number;

  constructor(userId: string, balance: number = 0) {
    this.userId = userId;
    this.balance = balance;
  }

  async save() {
    const { data, error } = await supabase
      .from('wallets')
      .insert([{ userId: this.userId, balance: this.balance }]);
    if (error) throw new Error(error.message);
    return data;
  }
}