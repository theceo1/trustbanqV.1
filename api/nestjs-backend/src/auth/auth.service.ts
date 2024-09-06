import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: any) {
    const { email, password, name } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ email, password: hashedPassword, name });
  }

  async login(loginDto: any) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
