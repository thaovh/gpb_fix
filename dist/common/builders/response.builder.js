"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinResponseBuilder = exports.ResponseBuilder = void 0;
class ResponseBuilder {
    static success(data, statusCode = 200, requestId, traceId) {
        return {
            success: true,
            status_code: statusCode,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                ...(requestId && { request_id: requestId }),
                ...(traceId && { trace_id: traceId }),
            },
        };
    }
    static error(error, statusCode, requestId, traceId) {
        return {
            success: false,
            status_code: statusCode,
            error: {
                ...error,
                timestamp: new Date().toISOString(),
                trace_id: traceId || 'unknown',
            },
            meta: {
                timestamp: new Date().toISOString(),
                ...(requestId && { request_id: requestId }),
                ...(traceId && { trace_id: traceId }),
            },
        };
    }
    static successWithPagination(data, total, limit, offset, requestId, traceId) {
        return {
            success: true,
            status_code: 200,
            data: {
                items: data,
                pagination: {
                    total,
                    limit,
                    offset,
                    hasNext: offset + limit < total,
                    hasPrev: offset > 0,
                },
            },
            meta: {
                timestamp: new Date().toISOString(),
                ...(requestId && { request_id: requestId }),
                ...(traceId && { trace_id: traceId }),
            },
        };
    }
    static successWithContext(data, statusCode = 200, context) {
        return this.success(data, statusCode, context.requestId, context.traceId);
    }
    static errorWithContext(error, statusCode, context) {
        const fullError = {
            ...error,
            timestamp: new Date().toISOString(),
            trace_id: context.traceId || 'unknown',
        };
        return this.error(fullError, statusCode, context.requestId, context.traceId);
    }
}
exports.ResponseBuilder = ResponseBuilder;
class JoinResponseBuilder {
    static successWithJoin(data, joinInfo, statusCode = 200, requestId, traceId) {
        return {
            success: true,
            status_code: statusCode,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                ...(requestId && { request_id: requestId }),
                ...(traceId && { trace_id: traceId }),
                joinInfo,
            },
        };
    }
    static successWithPagination(data, pagination, joinInfo, requestId, traceId) {
        return {
            success: true,
            status_code: 200,
            data: {
                items: data,
                pagination,
            },
            meta: {
                timestamp: new Date().toISOString(),
                ...(requestId && { request_id: requestId }),
                ...(traceId && { trace_id: traceId }),
                ...(joinInfo && { joinInfo }),
            },
        };
    }
}
exports.JoinResponseBuilder = JoinResponseBuilder;
//# sourceMappingURL=response.builder.js.map