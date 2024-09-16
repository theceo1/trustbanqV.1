"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const supabaseClient_1 = require("../supabaseClient");
const typeGuards_1 = require("../types/typeGuards");
let WalletService = class WalletService {
    async findByUserId(userId) {
        const { data, error } = await (0, supabaseClient_1.getSupabaseClient)()
            .from('wallets')
            .select('*')
            .eq('userId', userId)
            .single();
        if (error) {
            return null;
        }
        if (!(0, typeGuards_1.isWallet)(data)) {
            throw new Error('Invalid wallet data returned from Supabase');
        }
        return data;
    }
    async create(userId) {
        const { data, error } = await (0, supabaseClient_1.getSupabaseClient)()
            .from('wallets')
            .insert({ userId, balance: 0 })
            .single();
        if (error) {
            throw new Error(`Error creating wallet: ${error.message}`);
        }
        if (!(0, typeGuards_1.isWallet)(data)) {
            throw new Error('Invalid wallet data returned from Supabase');
        }
        return data;
    }
    async updateBalance(userId, amount) {
        const { data, error } = await (0, supabaseClient_1.getSupabaseClient)()
            .from('wallets')
            .update({ balance: amount })
            .eq('userId', userId)
            .single();
        if (error) {
            return null;
        }
        if (!(0, typeGuards_1.isWallet)(data)) {
            throw new Error('Invalid wallet data returned from Supabase');
        }
        return data;
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)()
], WalletService);
//# sourceMappingURL=wallet.service.js.map