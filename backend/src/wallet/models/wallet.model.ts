// backend/src/wallet/models/wallet.model.ts
import { createClient } from '@supabase/supabase-js';
import { Wallet } from '../schemas/wallet.schema'; 

// Initialize Supabase client
const supabase = createClient('https://mmrztyzajrvcakmkfkqr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcnp0eXphanJ2Y2FrbWtma3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNzE2MDEsImV4cCI6MjA0MTg0NzYwMX0.yMCOEwNEuVJl5G_NDyM9fDgtIGbH_mJ2fAx8K-q-FYo');

export const WalletModel = {
    save: async (wallet: Wallet) => {
        const { data, error } = await supabase
            .from('wallets')
            .insert([{ userId: wallet.userId, balance: wallet.balance }]);
        if (error) throw new Error(error.message);
        return data;
    },
};