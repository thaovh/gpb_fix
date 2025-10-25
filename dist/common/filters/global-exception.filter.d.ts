import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { AppLoggerService } from '../../shared/services/logger.service';
export interface ErrorResponse {
    success: false;
    status_code: number;
    error: {
        code: string;
        message: string;
        details?: any;
        timestamp: string;
        trace_id?: string;
    };
    meta: {
        timestamp: string;
        request_id?: string;
        path?: string;
        method?: string;
    };
}
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: AppLoggerService);
    catch(exception: unknown, host: ArgumentsHost): void;
    private buildErrorResponse;
    private logError;
    private generateTraceId;
}
