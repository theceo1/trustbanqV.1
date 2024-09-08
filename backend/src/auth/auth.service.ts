//trustbank/api/nestjs-backend/src/auth/auth.service.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ email, password: hashedPassword, name });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async googleLogin(req: any) {
    if (!req.user) {
      this.logger.warn('No user data received from Google');
      throw new UnauthorizedException('No user from Google');
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
          googleId: email, // Using email as googleId for simplicity
        });
        this.logger.log(`New user created via Google login: ${email}`);
      }

      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Error during Google login: ${error.message}`, error.stack);
      throw new UnauthorizedException('Failed to process Google login');
    }
  }
}
