import { Controller, Post, Body, Get, UseGuards, Req, Logger, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Login attempt for email: ${loginDto.email}`);
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      this.logger.warn(`Login failed for email: ${loginDto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`Login successful for email: ${loginDto.email}`);
    return this.authService.login(user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: RequestWithUser) {
    return this.authService.logout(req.user.id);
  }

  @Post('resend-confirmation')
  async resendConfirmation(@Body('email') email: string) {
    try {
      await this.authService.resendConfirmationEmail(email);
      return { message: 'Confirmation email sent successfully' };
    } catch (error) {
      throw new HttpException('Failed to resend confirmation email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Req() req: RequestWithUser) {
    this.logger.log(`Fetching user data for ID: ${req.user.id}`);
    const user = await this.authService.getUserById(req.user.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}