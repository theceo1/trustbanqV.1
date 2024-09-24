//backend/src/auth/auth.service.ts
import { Injectable, Logger, UnauthorizedException, BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE } from '../supabase.constants';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(SUPABASE) private readonly supabase: SupabaseClient
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const { data, error } = await this.supabase.auth.signUp({ email, password });

    if (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      throw new BadRequestException(error.message);
    }

    return { message: 'User registered successfully', userId: data.user?.id };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.logger.error(`User validation failed: ${error.message}`);
      return null;
    }

    return data.user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const payload = { sub: decoded.sub, email: decoded.email };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      this.logger.error(`Logout failed: ${error.message}`);
      throw new BadRequestException(error.message);
    }
    return { message: 'Logged out successfully' };
  }

  async resendConfirmationEmail(email: string) {
    const { error } = await this.supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      this.logger.error(`Resend confirmation email failed: ${error.message}`);
      throw new BadRequestException(error.message);
    }

    return { message: 'Confirmation email sent successfully' };
  }

  async getUserById(id: string) {
    this.logger.debug(`Attempting to fetch user with ID: ${id}`);
    const { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      this.logger.error(`Error fetching user: ${error.message}`);
      throw new NotFoundException('User not found');
    }

    if (!user) {
      this.logger.warn(`No user found with ID: ${id}`);
      throw new NotFoundException('User not found');
    }

    this.logger.debug(`User found: ${JSON.stringify(user)}`);
    return user;
  }
}
