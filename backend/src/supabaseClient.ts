   // backend/src/supabaseClient.ts
   import { createClient } from '@supabase/supabase-js';
   import { ConfigService } from '@nestjs/config';

   let supabase: ReturnType<typeof createClient> | undefined;

   export const initializeSupabase = (configService: ConfigService) => {
     const supabaseUrl = configService.get<string>('SUPABASE_URL');
     const supabaseAnonKey = configService.get<string>('SUPABASE_ANON_KEY');

     console.log('Supabase URL:', supabaseUrl); // Log the Supabase URL
     console.log('Supabase Anon Key:', supabaseAnonKey); // Log the Anon Key

     if (!supabaseUrl || !supabaseAnonKey) {
       throw new Error('Supabase URL and Anon Key must be defined in the environment variables');
     }

     supabase = createClient(supabaseUrl, supabaseAnonKey);
   };

   // Export the supabase instance directly
   export const getSupabaseClient = () => {
     if (!supabase) {
       throw new Error('Supabase client is not initialized. Call initializeSupabase first.');
     }
     return supabase;
   };

   // Export the supabase instance for direct use
   export const supabaseClient = () => {
     if (!supabase) {
       throw new Error('Supabase client is not initialized. Call initializeSupabase first.');
     }
     return supabase;
   };

   // Export the supabase instance for use in services
   export const supabaseInstance = () => {
     if (!supabase) {
       throw new Error('Supabase client is not initialized. Call initializeSupabase first.');
     }
     return supabase;
   };