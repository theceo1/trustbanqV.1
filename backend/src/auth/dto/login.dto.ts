//backend/src/auth/dto/login.dto.ts
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  googleId?: string;
}