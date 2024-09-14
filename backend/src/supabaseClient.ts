   // backend/src/supabaseClient.ts
   import { createClient } from '@supabase/supabase-js';
   import { ConfigService } from '@nestjs/config';

   const configService = new ConfigService();
   const supabaseUrl = configService.get<string>('SUPABASE_URL');
   const supabaseAnonKey = configService.get<string>('SUPABASE_ANON_KEY');

   // Check if the values are defined
   if (!supabaseUrl || !supabaseAnonKey) {
     throw new Error('Supabase URL and Anon Key must be defined in the environment variables');
   }

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);