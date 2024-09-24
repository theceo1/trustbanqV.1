"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_constants_1 = require("../supabase.constants");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, configService, supabase) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.supabase = supabase;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(registerDto) {
        var _a;
        const { email, password } = registerDto;
        const { data, error } = await this.supabase.auth.signUp({ email, password });
        if (error) {
            this.logger.error(`Registration failed: ${error.message}`);
            throw new common_1.BadRequestException(error.message);
        }
        return { message: 'User registered successfully', userId: (_a = data.user) === null || _a === void 0 ? void 0 : _a.id };
    }
    async validateUser(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
        if (error) {
            this.logger.error(`User validation failed: ${error.message}`);
            return null;
        }
        return data.user;
    }
    async login(user) {
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken);
            const payload = { sub: decoded.sub, email: decoded.email };
            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(userId) {
        const { error } = await this.supabase.auth.signOut();
        if (error) {
            this.logger.error(`Logout failed: ${error.message}`);
            throw new common_1.BadRequestException(error.message);
        }
        return { message: 'Logged out successfully' };
    }
    async resendConfirmationEmail(email) {
        const { error } = await this.supabase.auth.resend({
            type: 'signup',
            email: email,
        });
        if (error) {
            this.logger.error(`Resend confirmation email failed: ${error.message}`);
            throw new common_1.BadRequestException(error.message);
        }
        return { message: 'Confirmation email sent successfully' };
    }
    async getUserById(id) {
        this.logger.log(`Fetching user by ID: ${id}`);
        const { data: user, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            this.logger.error(`Error fetching user: ${error.message}`);
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(supabase_constants_1.SUPABASE)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        supabase_js_1.SupabaseClient])
], AuthService);
//# sourceMappingURL=auth.service.js.map