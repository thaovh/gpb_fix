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
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const app_error_1 = require("../errors/app.error");
const logger_service_1 = require("../../shared/services/logger.service");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const errorResponse = this.buildErrorResponse(exception, request);
        this.logError(exception, request, errorResponse);
        response.status(errorResponse.status_code).json(errorResponse);
    }
    buildErrorResponse(exception, request) {
        const timestamp = new Date().toISOString();
        const traceId = request.traceContext?.traceId || this.generateTraceId();
        if (exception instanceof app_error_1.AppError) {
            return {
                success: false,
                status_code: exception.getStatus(),
                error: {
                    code: exception.code,
                    message: exception.message,
                    details: exception.details,
                    timestamp: exception.timestamp,
                    trace_id: traceId,
                },
                meta: {
                    timestamp,
                    request_id: request.requestId || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    path: request.url,
                    method: request.method,
                },
            };
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            let message = 'Internal server error';
            let code = 'HTTP_001';
            let details = undefined;
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object') {
                const responseObj = exceptionResponse;
                message = responseObj.message || responseObj.error || message;
                code = responseObj.code || code;
                details = responseObj.details;
            }
            return {
                success: false,
                status_code: status,
                error: {
                    code,
                    message,
                    details,
                    timestamp,
                    trace_id: traceId,
                },
                meta: {
                    timestamp,
                    request_id: request.requestId || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    path: request.url,
                    method: request.method,
                },
            };
        }
        const error = exception;
        return {
            success: false,
            status_code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: {
                code: 'SYS_001',
                message: error.message || 'Internal server error',
                timestamp,
                trace_id: traceId,
            },
            meta: {
                timestamp,
                request_id: request.requestId || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                path: request.url,
                method: request.method,
            },
        };
    }
    logError(exception, request, errorResponse) {
        const { status_code, error } = errorResponse;
        const { method, url, ip, headers } = request;
        const userAgent = headers['user-agent'] || 'Unknown';
        const logContext = {
            traceId: error.trace_id,
            requestId: request.requestId || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            method,
            url,
            ip,
            userAgent,
            statusCode: status_code,
            errorCode: error.code,
            userId: request.user?.id,
        };
        if (status_code >= 500) {
            this.logger.error(`${method} ${url} - ${error.code}: ${error.message}`, exception instanceof Error ? exception.stack : undefined, logContext);
        }
        else if (status_code >= 400) {
            this.logger.warn(`${method} ${url} - ${error.code}: ${error.message}`, logContext);
        }
        else {
            this.logger.log(`${method} ${url} - ${error.code}: ${error.message}`, logContext);
        }
        if (process.env.NODE_ENV === 'development' && exception instanceof Error) {
            this.logger.debug('Error stack trace', {
                ...logContext,
                stack: exception.stack,
            });
        }
    }
    generateTraceId() {
        return `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [logger_service_1.AppLoggerService])
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map