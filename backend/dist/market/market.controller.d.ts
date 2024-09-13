import { MarketService } from './market.service';
export declare class MarketController {
    private readonly marketService;
    constructor(marketService: MarketService);
    getMarketTrends(): Promise<{
        message: string;
    }>;
    getMarketStats(): Promise<{
        message: string;
    }>;
}
