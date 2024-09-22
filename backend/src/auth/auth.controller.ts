//backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Logger, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { User } from '../types/user.types'; // Ensure this path is correct

interface RequestWithUser extends Request {
  user?: User; // Removed explicit type definition for _id
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message || 'Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Login request received for email: ${loginDto.email}`);
    try {
      const result = await this.authService.login(loginDto);
      this.logger.log(`Login successful for email: ${loginDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`Login failed for email: ${loginDto.email}`, error.stack);
      throw new UnauthorizedException(error.message || 'Invalid credentials');
    }
  }

  @Get('login-test')
  loginTest(): string {
    return 'Login endpoint is working!';
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: RequestWithUser) {
    const user = await this.authService.googleLogin(req);
    return { access_token: user.access_token, refresh_token: user.refresh_token };
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req: RequestWithUser) {
    if (!req.user) {
      throw new Error('User not found in request');
    }
    return this.authService.logout(req.user.id.toString());
  }

  @Post('resend-confirmation')
  async resendConfirmation(@Body('email') email: string) {
    try {
      const result = await this.authService.resendConfirmationEmail(email);
      return result;
    } catch (error) {
      throw new HttpException(error.message || 'Failed to resend confirmation email', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Req() req: RequestWithUser) {
    this.logger.log('getUser method called');
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    try {
      const user = await this.authService.getUserById(req.user.id);
      return { user };
    } catch (error) {
      this.logger.error(`Error fetching user data: ${error.message}`);
      throw new HttpException('Failed to fetch user data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}