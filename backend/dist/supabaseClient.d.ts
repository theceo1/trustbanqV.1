import { ConfigService } from '@nestjs/config';
export declare const initializeSupabase: (configService: ConfigService) => void;
export declare const getSupabaseClient: () => import("@supabase/supabase-js").SupabaseClient<unknown, never, import("@supabase/supabase-js/dist/module/lib/types").GenericSchema>;
