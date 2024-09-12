//trustbank/backend/src/auth/auth.service.ts
import { Injectable, Logger, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
    try {
      const { email, password, name } = registerDto;
      this.logger.log(`Attempting to register user with email: ${email}`);
      
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        this.logger.warn(`Registration failed: Email ${email} already exists`);
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userService.create({ email, password: hashedPassword, name });
      
      this.logger.log(`User registered successfully: ${newUser.email}`);
      return { message: 'User registered successfully', userId: newUser._id }; // Ensure this line is present
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw new BadRequestException(error.message || 'Registration failed');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
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
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } catch (error) {
      this.logger.error(`Error during Google login: ${error.message}`, error.stack);
      throw new UnauthorizedException('Failed to process Google login');
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.sub);
      const newPayload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(newPayload),
        refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // Implement logout logic here
    // This could involve invalidating the refresh token in the database
    this.logger.log(`User ${userId} logged out`);
    return { message: 'Logged out successfully' };
  }
}
