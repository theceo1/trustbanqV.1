import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppModule implements OnModuleInit {
    private configService;
    constructor(configService: ConfigService);
    onModuleInit(): void;
}
