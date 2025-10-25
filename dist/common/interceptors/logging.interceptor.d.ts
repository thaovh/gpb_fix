import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppLoggerService } from '../../shared/services/logger.service';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: AppLoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
