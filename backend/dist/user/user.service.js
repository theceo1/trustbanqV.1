"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const supabaseClient_1 = require("../supabaseClient");
const typeGuards_1 = require("../types/typeGuards");
let UserService = class UserService {
    async create(createUserDto) {
        const { data, error } = await (0, supabaseClient_1.getSupabaseClient)()
            .from('users')
            .insert(createUserDto)
            .single();
        if (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
        if (!(0, typeGuards_1.isUser)(data)) {
            throw new Error('Invalid user data returned from Supabase');
        }
        return data;
    }
    async findByEmail(email) {
        const { data, error } = await (0, supabaseClient_1.getSupabaseClient)()
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (error) {
            return null;
        }
        if (!(0, typeGuards_1.isUser)(data)) {
            throw new Error('Invalid user data returned from Supabase');
        }
        return data;
    }
    async findById(id) {
        const { data, error } = await (0, supabaseClient_1.getSupabaseClient)()
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (!(0, typeGuards_1.isUser)(data)) {
            throw new Error('Invalid user data returned from Supabase');
        }
        const { password } = data, result = __rest(data, ["password"]);
        return result;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map