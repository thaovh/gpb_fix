import { PaginationMeta } from '../dto/pagination-response.dto';
export interface BaseResponse<T = any> {
    success: boolean;
    status_code: number;
    data?: T;
    meta?: Meta;
    error?: AppError;
}
export interface Meta {
    pagination?: Pagination;
    timestamp: string;
    request_id?: string;
    trace_id?: string;
    joinInfo?: {
        totalJoins: number;
        joinTables: string[];
        executionTime: number;
    };
}
export interface Pagination {
    limit: number;
    offset: number;
    total: number;
    has_next: boolean;
    has_prev: boolean;
}
export interface AppError {
    code: string;
    message: string;
    timestamp: string;
    trace_id: string;
    details?: any;
}
export declare class ResponseBuilder {
    static success<T>(data: T, statusCode?: number, requestId?: string, traceId?: string): BaseResponse<T>;
    static error(error: AppError, statusCode: number, requestId?: string, traceId?: string): BaseResponse;
    static successWithPagination<T>(data: T[], total: number, limit: number, offset: number, requestId?: string, traceId?: string): BaseResponse<{
        items: T[];
        pagination: PaginationMeta;
    }>;
    static successWithContext<T>(data: T, statusCode: number, context: {
        requestId?: string;
        traceId?: string;
    }): BaseResponse<T>;
    static errorWithContext(error: Omit<AppError, 'timestamp' | 'trace_id'>, statusCode: number, context: {
        requestId?: string;
        traceId?: string;
    }): BaseResponse;
}
export declare class JoinResponseBuilder {
    static successWithJoin<T>(data: T, joinInfo: {
        totalJoins: number;
        joinTables: string[];
        executionTime: number;
    }, statusCode?: number, requestId?: string, traceId?: string): BaseResponse<T>;
    static successWithPagination<T>(data: T[], pagination: {
        total: number;
        limit: number;
        offset: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, joinInfo?: {
        totalJoins: number;
        joinTables: string[];
        executionTime: number;
    }, requestId?: string, traceId?: string): BaseResponse<{
        items: T[];
        pagination: typeof pagination;
    }>;
}
