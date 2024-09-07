"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./common/services/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_service_1.LoggerService(),
    });
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000' || 'https://trustbank1.vercel.app',
        credentials: true,
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map