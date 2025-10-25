"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./config/swagger.config");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const request_context_middleware_1 = require("./common/middleware/request-context.middleware");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const logger_service_1 = require("./shared/services/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const loggerService = app.get(logger_service_1.AppLoggerService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter(loggerService));
    const requestContextMiddleware = new request_context_middleware_1.RequestContextMiddleware();
    app.use(requestContextMiddleware.use.bind(requestContextMiddleware));
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(loggerService));
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
        credentials: true,
    });
    app.setGlobalPrefix(process.env.API_PREFIX || '/api/v1');
    (0, swagger_config_1.setupSwagger)(app);
    const port = process.env.PORT || 8000;
    await app.listen(port);
    console.log(`🚀 LIS GPB Backend is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/v1/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map