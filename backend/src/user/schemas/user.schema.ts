import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://mmrztyzajrvcakmkfkqr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcnp0eXphanJ2Y2FrbWtma3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNzE2MDEsImV4cCI6MjA0MTg0NzYwMX0.yMCOEwNEuVJl5G_NDyM9fDgtIGbH_mJ2fAx8K-q-FYo');

export interface User {
  email: string;
  password: string;
  name?: string;
  balance: number;
  googleId?: string;
}

export async function createUser(user: User) {
  const { data, error } = await supabase
    .from('users')
    .insert([user]);
  if (error) throw new Error(error.message);
  return data;
}