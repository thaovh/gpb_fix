import { HttpException, HttpStatus } from '@nestjs/common';
export interface AppErrorDetails {
    field?: string;
    value?: any;
    constraint?: string;
    context?: Record<string, any>;
}
export declare class AppError extends HttpException {
    readonly code: string;
    readonly details?: AppErrorDetails;
    readonly timestamp: string;
    readonly traceId?: string;
    constructor(code: string, message: string, statusCode?: HttpStatus, details?: AppErrorDetails, traceId?: string);
    static internalServerError(message?: string, traceId?: string): AppError;
    static serviceUnavailable(message?: string, traceId?: string): AppError;
    static requestTimeout(message?: string, traceId?: string): AppError;
    static databaseConnectionError(message?: string, traceId?: string): AppError;
    static validationError(message: string, field?: string, value?: any): AppError;
    static invalidFormat(message: string, field: string, value: any): AppError;
    static valueOutOfRange(message: string, field: string, value: any, min?: number, max?: number): AppError;
    static requiredField(field: string): AppError;
    static passwordStrengthError(errors: string[]): AppError;
    static unauthorized(message?: string): AppError;
    static invalidToken(message?: string): AppError;
    static tokenExpired(message?: string): AppError;
    static insufficientPermissions(message?: string): AppError;
    static accountLocked(message?: string): AppError;
    static accountInactive(message?: string): AppError;
    static notFound(resource: string, id?: string): AppError;
    static conflict(message: string, field?: string, value?: any): AppError;
    static businessRuleViolation(message: string, rule?: string): AppError;
    static resourceLimitExceeded(message: string, limit?: number): AppError;
    static duplicateEntry(field: string, value: any): AppError;
    static externalServiceError(service: string, message: string): AppError;
    static externalServiceTimeout(service: string): AppError;
    static externalServiceUnavailable(service: string): AppError;
    static rateLimitExceeded(limit: number, window: string): AppError;
    static cacheError(operation: string, message: string): AppError;
    static databaseError(operation: string, message: string): AppError;
    static constraintViolation(constraint: string, message: string): AppError;
    static transactionFailed(message: string): AppError;
    static fileNotFound(filename: string): AppError;
    static fileSizeExceeded(maxSize: number): AppError;
    static invalidFileType(allowedTypes: string[]): AppError;
    static fromHttpException(exception: HttpException, code?: string): AppError;
    static fromError(error: Error, code?: string): AppError;
    static getStatusFromErrorCode(errorCode: string): HttpStatus;
}
