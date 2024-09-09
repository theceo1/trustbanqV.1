import { Controller, Get, Post, Body, UseGuards, Request, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: RequestWithUser) {
    this.logger.log('getProfile method called');
    this.logger.log(`User ID: ${req.user.userId}`);
    return this.userService.findById(req.user.userId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}