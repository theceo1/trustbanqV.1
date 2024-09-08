//backend/src/auth/dto/google-auth.dto.ts
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class GoogleAuthDto {
  @IsString()
  googleId: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  picture?: string;
}
