import { ConfigService } from '@nestjs/config';
export declare const initializeSupabase: (configService: ConfigService) => import("@supabase/supabase-js").SupabaseClient<unknown, never, import("@supabase/supabase-js/dist/module/lib/types").GenericSchema>;
export declare const getSupabaseClient: () => import("@supabase/supabase-js").SupabaseClient<unknown, never, import("@supabase/supabase-js/dist/module/lib/types").GenericSchema>;
