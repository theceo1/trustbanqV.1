//backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { User } from '../types/user.types'; // Ensure this path is correct

interface RequestWithUser extends Request {
  user?: User & { _id: string }; // Explicitly define _id as a string
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
    return this.authService.login(loginDto);
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
    return this.authService.logout(req.user._id.toString());
  }
}