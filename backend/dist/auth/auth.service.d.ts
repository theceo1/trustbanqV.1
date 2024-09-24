import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly supabase;
    private readonly logger;
    constructor(jwtService: JwtService, configService: ConfigService, supabase: SupabaseClient);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userId: string | undefined;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    resendConfirmationEmail(email: string): Promise<{
        message: string;
    }>;
    getUserById(id: string): Promise<any>;
}
