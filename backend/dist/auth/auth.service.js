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
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const supabase_js_1 = require("@supabase/supabase-js");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService, supabase) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.supabase = supabase;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(registerDto) {
        try {
            const { email, password, name } = registerDto;
            this.logger.log(`Attempting to register user with email: ${email}`);
            const { data: existingUsers, error: userError } = await this.supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .limit(1);
            if (userError) {
                this.logger.error(`Error checking existing user: ${userError.message}`);
                throw new common_1.BadRequestException('Error checking existing user');
            }
            if (existingUsers.length > 0) {
                this.logger.warn(`Registration failed: Email ${email} already exists`);
                throw new common_1.BadRequestException('Email already exists');
            }
            const { data: user, error } = await this.supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                this.logger.error(`Error during sign up: ${error.message}`);
                throw new common_1.BadRequestException(error.message);
            }
            if (!user || !user.user) {
                this.logger.error('User registration failed: No user data returned');
                throw new common_1.BadRequestException('User registration failed');
            }
            const userData = {
                email,
                name,
                created_at: new Date().toISOString(),
                id: user.user.id,
            };
            const { data: insertedUser, error: insertError } = await this.supabase
                .from('users')
                .insert([userData]);
            if (insertError) {
                this.logger.error(`Error inserting user into users table: ${insertError.message}`);
                throw new common_1.BadRequestException('User registration succeeded, but failed to save user data');
            }
            this.logger.log(`User registered successfully: ${user.user.email}`);
            return { message: 'User registered successfully', userId: user.user.id };
        }
        catch (error) {
            this.logger.error(`Registration error: ${error.message}`);
            throw new common_1.BadRequestException('Registration failed');
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        this.logger.log(`Login attempt for email: ${email}`);
        try {
            this.logger.log('Attempting Supabase signInWithPassword');
            const { data: user, error } = await this.supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                this.logger.error(`Supabase login error for ${email}:`, error);
                if (error.message.includes('Email not confirmed')) {
                    throw new common_1.UnauthorizedException('Email not confirmed. Please check your inbox and confirm your email.');
                }
                else if (error.message.includes('Invalid login credentials')) {
                    throw new common_1.UnauthorizedException('Invalid email or password');
                }
                else {
                    throw new common_1.UnauthorizedException('Login failed: ' + error.message);
                }
            }
            if (!user || !user.user) {
                this.logger.warn(`No user data returned from Supabase for ${email}`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            this.logger.log(`Login successful for user: ${email}`);
            const payload = { email: user.user.email, sub: user.user.id };
            const tokens = {
                access_token: this.jwtService.sign(payload),
                refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            };
            this.logger.log(`Tokens generated for ${email}:`, tokens);
            return tokens;
        }
        catch (error) {
            this.logger.error(`Login error for ${email}:`, error);
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            else {
                throw new common_1.UnauthorizedException('An unexpected error occurred during login');
            }
        }
    }
    async googleLogin(req) {
        if (!req.user) {
            this.logger.warn('No user data received from Google');
            throw new common_1.UnauthorizedException('No user from Google');
        }
        try {
            const { email, firstName } = req.user;
            let user = await this.userService.findByEmail(email);
            if (!user) {
                const randomPassword = Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(randomPassword, 10);
                user = await this.userService.create({
                    email,
                    name: firstName,
                    password: hashedPassword,
                    googleId: email,
                });
                this.logger.log(`New user created via Google login: ${email}`);
            }
            const payload = { email: user.email, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            };
        }
        catch (error) {
            this.logger.error(`Error during Google login: ${error.message}`, error.stack);
            throw new common_1.UnauthorizedException('Failed to process Google login');
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.userService.findById(payload.sub);
            const newPayload = { email: user.email, sub: user.id };
            return {
                access_token: this.jwtService.sign(newPayload),
                refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
            };
        }
        catch (error) {
            this.logger.error(`Error refreshing token: ${error.message}`, error.stack);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(userId) {
        this.logger.log(`User ${userId} logged out`);
        return { message: 'Logged out successfully' };
    }
    async resendConfirmationEmail(email) {
        const { data: existingUser, error: userError } = await this.supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (userError || !existingUser) {
            this.logger.error(`Error finding user: ${(userError === null || userError === void 0 ? void 0 : userError.message) || 'User not found'}`);
            throw new common_1.BadRequestException('User not found');
        }
        if (existingUser.confirmed_at) {
            this.logger.warn(`User ${email} is already confirmed.`);
            throw new common_1.BadRequestException('User is already confirmed');
        }
        const { error } = await this.supabase.auth.signUp({
            email,
            password: 'temporaryPassword',
        });
        if (error) {
            this.logger.error(`Error resending confirmation email: ${error.message}`);
            throw new common_1.BadRequestException('Error resending confirmation email');
        }
        this.logger.log(`Confirmation email resent to: ${email}`);
        return { message: 'Confirmation email resent successfully' };
    }
    async getUserById(userId) {
        const { data: user, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('id', userId)
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
    __param(2, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        supabase_js_1.SupabaseClient])
], AuthService);
//# sourceMappingURL=auth.service.js.map