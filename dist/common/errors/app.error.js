"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const common_1 = require("@nestjs/common");
class AppError extends common_1.HttpException {
    constructor(code, message, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR, details, traceId) {
        super({
            code,
            message,
            details,
            timestamp: new Date().toISOString(),
            traceId,
        }, statusCode);
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
        this.traceId = traceId;
    }
    static internalServerError(message = 'Internal server error', traceId) {
        return new AppError('SYS_001', message, common_1.HttpStatus.INTERNAL_SERVER_ERROR, undefined, traceId);
    }
    static serviceUnavailable(message = 'Service temporarily unavailable', traceId) {
        return new AppError('SYS_002', message, common_1.HttpStatus.SERVICE_UNAVAILABLE, undefined, traceId);
    }
    static requestTimeout(message = 'Request timeout', traceId) {
        return new AppError('SYS_003', message, common_1.HttpStatus.REQUEST_TIMEOUT, undefined, traceId);
    }
    static databaseConnectionError(message = 'Database connection failed', traceId) {
        return new AppError('SYS_004', message, common_1.HttpStatus.SERVICE_UNAVAILABLE, undefined, traceId);
    }
    static validationError(message, field, value) {
        return new AppError('VAL_001', message, common_1.HttpStatus.BAD_REQUEST, { field, value });
    }
    static invalidFormat(message, field, value) {
        return new AppError('VAL_002', message, common_1.HttpStatus.UNPROCESSABLE_ENTITY, { field, value, constraint: 'format' });
    }
    static valueOutOfRange(message, field, value, min, max) {
        return new AppError('VAL_003', message, common_1.HttpStatus.UNPROCESSABLE_ENTITY, { field, value, constraint: 'range', context: { min, max } });
    }
    static requiredField(field) {
        return new AppError('VAL_004', `${field} is required`, common_1.HttpStatus.BAD_REQUEST, { field, constraint: 'required' });
    }
    static passwordStrengthError(errors) {
        return new AppError('VAL_005', 'Password does not meet strength requirements', common_1.HttpStatus.BAD_REQUEST, { field: 'password', constraint: 'strength', context: { errors } });
    }
    static unauthorized(message = 'Unauthorized') {
        return new AppError('AUTH_001', message, common_1.HttpStatus.UNAUTHORIZED);
    }
    static invalidToken(message = 'Invalid or expired token') {
        return new AppError('AUTH_002', message, common_1.HttpStatus.UNAUTHORIZED);
    }
    static tokenExpired(message = 'Token has expired') {
        return new AppError('AUTH_003', message, common_1.HttpStatus.UNAUTHORIZED);
    }
    static insufficientPermissions(message = 'Insufficient permissions') {
        return new AppError('AUTH_004', message, common_1.HttpStatus.FORBIDDEN);
    }
    static accountLocked(message = 'Account is locked') {
        return new AppError('AUTH_005', message, common_1.HttpStatus.FORBIDDEN);
    }
    static accountInactive(message = 'Account is inactive') {
        return new AppError('AUTH_006', message, common_1.HttpStatus.FORBIDDEN);
    }
    static notFound(resource, id) {
        const message = id ? `${resource} with ID '${id}' not found` : `${resource} not found`;
        return new AppError('BIZ_001', message, common_1.HttpStatus.NOT_FOUND, { field: 'id', value: id });
    }
    static conflict(message, field, value) {
        return new AppError('BIZ_002', message, common_1.HttpStatus.CONFLICT, { field, value });
    }
    static businessRuleViolation(message, rule) {
        return new AppError('BIZ_003', message, common_1.HttpStatus.UNPROCESSABLE_ENTITY, { constraint: rule });
    }
    static resourceLimitExceeded(message, limit) {
        return new AppError('BIZ_004', message, common_1.HttpStatus.UNPROCESSABLE_ENTITY, { context: { limit } });
    }
    static duplicateEntry(field, value) {
        return new AppError('BIZ_005', `${field} '${value}' already exists`, common_1.HttpStatus.CONFLICT, { field, value });
    }
    static externalServiceError(service, message) {
        return new AppError('EXT_001', `${service} service error: ${message}`, common_1.HttpStatus.BAD_GATEWAY, {
            context: { service },
        });
    }
    static externalServiceTimeout(service) {
        return new AppError('EXT_002', `${service} service timeout`, common_1.HttpStatus.GATEWAY_TIMEOUT, {
            context: { service },
        });
    }
    static externalServiceUnavailable(service) {
        return new AppError('EXT_003', `${service} service unavailable`, common_1.HttpStatus.SERVICE_UNAVAILABLE, {
            context: { service },
        });
    }
    static rateLimitExceeded(limit, window) {
        return new AppError('RATE_001', `Rate limit exceeded: ${limit} requests per ${window}`, common_1.HttpStatus.TOO_MANY_REQUESTS, { context: { limit, window } });
    }
    static cacheError(operation, message) {
        return new AppError('CACHE_001', `Cache ${operation} failed: ${message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
            context: { operation },
        });
    }
    static databaseError(operation, message) {
        return new AppError('DB_001', `Database ${operation} failed: ${message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
            context: { operation },
        });
    }
    static constraintViolation(constraint, message) {
        return new AppError('DB_002', `Database constraint violation: ${message}`, common_1.HttpStatus.CONFLICT, {
            constraint,
        });
    }
    static transactionFailed(message) {
        return new AppError('DB_003', `Transaction failed: ${message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    static fileNotFound(filename) {
        return new AppError('FILE_001', `File '${filename}' not found`, common_1.HttpStatus.NOT_FOUND, {
            field: 'filename',
            value: filename,
        });
    }
    static fileSizeExceeded(maxSize) {
        return new AppError('FILE_002', `File size exceeds maximum allowed size of ${maxSize} bytes`, common_1.HttpStatus.PAYLOAD_TOO_LARGE, {
            context: { maxSize },
        });
    }
    static invalidFileType(allowedTypes) {
        return new AppError('FILE_003', `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`, common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE, {
            context: { allowedTypes },
        });
    }
    static fromHttpException(exception, code) {
        const statusCode = exception.getStatus();
        const response = exception.getResponse();
        const message = typeof response === 'string' ? response : response.message || 'Unknown error';
        return new AppError(code || 'UNKNOWN_001', message, statusCode);
    }
    static fromError(error, code = 'UNKNOWN_002') {
        return new AppError(code, error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    static getStatusFromErrorCode(errorCode) {
        const codePrefix = errorCode.split('_')[0];
        switch (codePrefix) {
            case 'SYS':
                return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            case 'VAL':
                return common_1.HttpStatus.BAD_REQUEST;
            case 'AUTH':
                return common_1.HttpStatus.UNAUTHORIZED;
            case 'BIZ':
                return common_1.HttpStatus.UNPROCESSABLE_ENTITY;
            case 'EXT':
                return common_1.HttpStatus.BAD_GATEWAY;
            case 'RATE':
                return common_1.HttpStatus.TOO_MANY_REQUESTS;
            case 'CACHE':
            case 'DB':
                return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            case 'FILE':
                return common_1.HttpStatus.BAD_REQUEST;
            default:
                return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app.error.js.map