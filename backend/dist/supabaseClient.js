"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseClient = exports.initializeSupabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
let supabase;
const initializeSupabase = (configService) => {
    const supabaseUrl = configService.get('SUPABASE_URL');
    const supabaseAnonKey = configService.get('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase URL and Anon Key must be defined in the environment variables');
    }
    supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
    return supabase;
};
exports.initializeSupabase = initializeSupabase;
const getSupabaseClient = () => {
    if (!supabase) {
        throw new Error('Supabase client is not initialized. Call initializeSupabase first.');
    }
    return supabase;
};
exports.getSupabaseClient = getSupabaseClient;
//# sourceMappingURL=supabaseClient.js.map