import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../user/schemas/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    } | null>;
    googleAuth(req: Request): Promise<void>;
    googleAuthRedirect(req: Request): Promise<"No user from google" | {
        message: string;
        user: Express.User;
    }>;
}
