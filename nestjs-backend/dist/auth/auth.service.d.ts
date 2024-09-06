import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(registerDto: any): Promise<import("../user/schemas/user.schema").User>;
    login(loginDto: any): Promise<{
        access_token: string;
    }>;
    googleLogin(req: any): Promise<"No user from google" | {
        message: string;
        user: any;
    }>;
}
