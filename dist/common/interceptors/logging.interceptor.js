"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const logger_service_1 = require("../../shared/services/logger.service");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const startTime = Date.now();
        const className = context.getClass().name;
        const methodName = context.getHandler().name;
        const operation = `${className}.${methodName}`;
        this.logger.debug(`Method entry: ${operation}`, {
            traceId: request.traceContext?.traceId,
            requestId: request.requestId,
            method: request.method,
            url: request.url,
            operation,
            userId: request.user?.id,
        });
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const duration = Date.now() - startTime;
            this.logger.debug(`Method success: ${operation}`, {
                traceId: request.traceContext?.traceId,
                requestId: request.requestId,
                operation,
                duration,
                userId: request.user?.id,
                responseSize: JSON.stringify(data).length,
            });
            if (duration > 1000) {
                this.logger.logPerformance(operation, duration, {
                    traceId: request.traceContext?.traceId,
                    requestId: request.requestId,
                    operation,
                    userId: request.user?.id,
                });
            }
        }), (0, operators_1.catchError)((error) => {
            const duration = Date.now() - startTime;
            this.logger.error(`Method error: ${operation}`, error.stack, {
                traceId: request.traceContext?.traceId,
                requestId: request.requestId,
                operation,
                duration,
                userId: request.user?.id,
                errorName: error.name,
                errorMessage: error.message,
                errorCode: error.code,
            });
            throw error;
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.AppLoggerService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map