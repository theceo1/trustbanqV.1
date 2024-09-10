import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Request } from 'express';
import { User } from '../user/schemas/user.schema';
interface RequestWithUser extends Request {
    user?: User;
}
export declare class AuthController {
    private authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userId: any;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    loginTest(): string;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: RequestWithUser): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: RequestWithUser): Promise<{
        message: string;
    }>;
}
export {};
