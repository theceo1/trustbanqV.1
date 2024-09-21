"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./common/services/logger.service");
const config_1 = require("@nestjs/config");
const supabaseClient_1 = require("./supabaseClient");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_service_1.LoggerService(),
    });
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const allowedOrigins = [
        'http://localhost:3000',
        'https://trustbank1.vercel.app',
        process.env.FRONTEND_URL,
    ].filter((origin) => !!origin);
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const configService = app.get(config_1.ConfigService);
    (0, supabaseClient_1.initializeSupabase)(configService);
    const port = process.env.PORT || 5001;
    await app.listen(port);
    console.log(`Application is running on port ${port}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map