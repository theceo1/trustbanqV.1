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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(registerDto) {
        try {
            const { email, password, name } = registerDto;
            this.logger.log(`Attempting to register user with email: ${email}`);
            const existingUser = await this.userService.findByEmail(email);
            if (existingUser) {
                this.logger.warn(`Registration failed: Email ${email} already exists`);
                throw new common_1.BadRequestException('Email already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userService.create({ email, password: hashedPassword, name });
            this.logger.log(`User registered successfully: ${newUser.email}`);
            return { message: 'User registered successfully', userId: newUser._id };
        }
        catch (error) {
            this.logger.error(`Registration failed: ${error.message}`, error.stack);
            throw new common_1.BadRequestException(error.message || 'Registration failed');
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { email: user.email, sub: user._id };
            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            };
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
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
            const payload = { email: user.email, sub: user._id };
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
            const newPayload = { email: user.email, sub: user._id };
            return {
                access_token: this.jwtService.sign(newPayload),
                refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(userId) {
        this.logger.log(`User ${userId} logged out`);
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map