//backend/src/market/market.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('trends')
  async getMarketTrends() {
    return this.marketService.getMarketTrends();
  }

  @Get('stats')
  async getMarketStats() {
    return this.marketService.getMarketStats();
  }

  // Add more endpoints as needed
}