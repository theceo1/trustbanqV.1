//trustbank/backend/src/auth/auth.service.ts
import { Injectable, Logger, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { getSupabaseClient } from '../supabaseClient';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private get supabase() {
    return getSupabaseClient(); // Access the initialized Supabase client
  }

  async register(registerDto: RegisterDto) {
    try {
      const { email, password, name } = registerDto;
      this.logger.log(`Attempting to register user with email: ${email}`);
      
      const { data: existingUser, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        throw new BadRequestException('Error checking existing user');
      }

      if (existingUser) {
        this.logger.warn(`Registration failed: Email ${email} already exists`);
        throw new BadRequestException('Email already exists');
      }

      const { data: user, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new BadRequestException(error.message);
      }

      if (!user || !user.user) {
        throw new BadRequestException('User registration failed');
      }

      this.logger.log(`User registered successfully: ${user.user.email}`);
      return { message: 'User registered successfully', userId: user.user.id };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw new BadRequestException(error.message || 'Registration failed');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    this.logger.log(`Login attempt for email: ${email}`);

    const { data: user, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !user || !user.user) {
      this.logger.warn(`Invalid credentials for user: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.user.email, sub: user.user.id };
    this.logger.log(`Login successful for user: ${email}`);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
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
          googleId: email,
        });
        this.logger.log(`New user created via Google login: ${email}`);
      }

      const payload = { email: user.email, sub: user.id };
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
      const newPayload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(newPayload),
        refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    this.logger.log(`User ${userId} logged out`);
    return { message: 'Logged out successfully' };
  }
}
