"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModel = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)('https://mmrztyzajrvcakmkfkqr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcnp0eXphanJ2Y2FrbWtma3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNzE2MDEsImV4cCI6MjA0MTg0NzYwMX0.yMCOEwNEuVJl5G_NDyM9fDgtIGbH_mJ2fAx8K-q-FYo');
exports.WalletModel = {
    save: async (wallet) => {
        const { data, error } = await supabase
            .from('wallets')
            .insert([{ userId: wallet.userId, balance: wallet.balance }]);
        if (error)
            throw new Error(error.message);
        return data;
    },
};
//# sourceMappingURL=wallet.model.js.map