   // backend/src/supabaseClient.ts
   import { createClient } from '@supabase/supabase-js';
   import { ConfigService } from '@nestjs/config';
   
   let supabase: ReturnType<typeof createClient> | undefined;
   
   export const initializeSupabase = (configService: ConfigService) => {
     const supabaseUrl = configService.get<string>('SUPABASE_URL');
     const supabaseAnonKey = configService.get<string>('SUPABASE_ANON_KEY');
   
     if (!supabaseUrl || !supabaseAnonKey) {
       throw new Error('Supabase URL and Anon Key must be defined in the environment variables');
     }
   
     supabase = createClient(supabaseUrl, supabaseAnonKey);
     return supabase; // Return the initialized client
   };
   
   // Export the supabase instance
   export const getSupabaseClient = () => {
     if (!supabase) {
       throw new Error('Supabase client is not initialized. Call initializeSupabase first.');
     }
     return supabase;
   };