import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../user/schemas/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    loginTest(): string;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: Request): Promise<{
        access_token: string;
    }>;
}
