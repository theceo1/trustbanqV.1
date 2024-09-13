//backend/src/wallet/wallet.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getWallet(@Param('userId') userId: string) {
    return this.walletService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/update-balance')
  async updateBalance(@Param('userId') userId: string, @Body('amount') amount: number) {
    return this.walletService.updateBalance(userId, amount);
  }
}