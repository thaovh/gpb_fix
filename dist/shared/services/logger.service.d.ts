import { LogLevel } from '@nestjs/common';
export interface LogContext {
    traceId?: string;
    requestId?: string;
    userId?: string;
    method?: string;
    url?: string;
    ip?: string;
    userAgent?: string;
    duration?: number;
    statusCode?: number;
    errorCode?: string;
    [key: string]: any;
}
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: LogContext;
    stack?: string;
    service: string;
    version: string;
    environment: string;
}
export declare class AppLoggerService {
    private readonly serviceName;
    private readonly version;
    private readonly environment;
    private readonly logDir;
    private readonly maxFileSize;
    private readonly maxFiles;
    constructor();
    private ensureLogDirectory;
    private getLogFileName;
    private formatLogEntry;
    private writeToFile;
    private rotateLogFile;
    private shouldLog;
    log(message: string, context?: LogContext): void;
    error(message: string, stack?: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    debug(message: string, context?: LogContext): void;
    verbose(message: string, context?: LogContext): void;
    logRequest(method: string, url: string, context: LogContext): void;
    logResponse(method: string, url: string, statusCode: number, duration: number, context: LogContext): void;
    logDatabaseQuery(query: string, duration: number, context: LogContext): void;
    logBusinessEvent(event: string, data: any, context: LogContext): void;
    logSecurityEvent(event: string, severity: 'low' | 'medium' | 'high' | 'critical', context: LogContext): void;
    logPerformance(operation: string, duration: number, context: LogContext): void;
    getLogFiles(): string[];
    clearOldLogs(): void;
}
