// backend/src/auth/auth.service.ts
import { Injectable, Logger, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SupabaseClient } from '@supabase/supabase-js'; // Import SupabaseClient

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient, // Inject Supabase client
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { email, password, name } = registerDto;
      this.logger.log(`Attempting to register user with email: ${email}`);

      // Check for existing user
      const { data: existingUsers, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (userError) {
        this.logger.error(`Error checking existing user: ${userError.message}`);
        throw new BadRequestException('Error checking existing user');
      }

      if (existingUsers.length > 0) {
        this.logger.warn(`Registration failed: Email ${email} already exists`);
        throw new BadRequestException('Email already exists');
      }

      // Sign up the user
      const { data: user, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        this.logger.error(`Error during sign up: ${error.message}`);
        throw new BadRequestException(error.message);
      }

      if (!user || !user.user) {
        this.logger.error('User registration failed: No user data returned');
        throw new BadRequestException('User registration failed');
      }

      // Insert user data into the users table
      const userData = {
        email,
        name,
        created_at: new Date().toISOString(),
        id: user.user.id, // Use the Supabase user ID
      };

      const { data: insertedUser, error: insertError } = await this.supabase
        .from('users')
        .insert([userData]);

      if (insertError) {
        this.logger.error(`Error inserting user into users table: ${insertError.message}`);
        throw new BadRequestException('User registration succeeded, but failed to save user data');
      }

      this.logger.log(`User registered successfully: ${user.user.email}`);
      return { message: 'User registered successfully', userId: user.user.id };
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      throw new BadRequestException('Registration failed');
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
      this.logger.error(`Login error: ${error ? error.message : 'No user data returned'}`);
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
      this.logger.error(`Error refreshing token: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    this.logger.log(`User ${userId} logged out`);
    return { message: 'Logged out successfully' };
  }

  async resendConfirmationEmail(email: string) {
    // Check if the user exists
    const { data: existingUser, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (userError || !existingUser) {
        this.logger.error(`Error finding user: ${userError?.message || 'User not found'}`);
        throw new BadRequestException('User not found');
    }

    // Check if the user is confirmed
    if (existingUser.confirmed_at) {
        this.logger.warn(`User ${email} is already confirmed.`);
        throw new BadRequestException('User is already confirmed');
    }

    // Re-invite the user (this is a workaround)
    const { error } = await this.supabase.auth.signUp({
        email,
        password: 'temporaryPassword', // Use a temporary password or handle it as needed
    });

    if (error) {
        this.logger.error(`Error resending confirmation email: ${error.message}`);
        throw new BadRequestException('Error resending confirmation email');
    }

    this.logger.log(`Confirmation email resent to: ${email}`);
    return { message: 'Confirmation email resent successfully' };
  }
}
