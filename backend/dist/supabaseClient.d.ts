import { ConfigService } from '@nestjs/config';
export declare const initializeSupabase: (configService: ConfigService) => void;
export declare const getSupabaseClient: () => import("@supabase/supabase-js").SupabaseClient<unknown, never, import("@supabase/supabase-js/dist/module/lib/types").GenericSchema>;
export declare const supabaseClient: () => import("@supabase/supabase-js").SupabaseClient<unknown, never, import("@supabase/supabase-js/dist/module/lib/types").GenericSchema>;
export declare const supabaseInstance: () => import("@supabase/supabase-js").SupabaseClient<unknown, never, import("@supabase/supabase-js/dist/module/lib/types").GenericSchema>;
