import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<import("../user/schemas/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    googleLogin(req: Request): Promise<"No user from google" | {
        message: string;
        user: Express.User;
    }>;
}
