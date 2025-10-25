"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let RequestContextMiddleware = class RequestContextMiddleware {
    use(req, res, next) {
        req.requestId = this.generateRequestId();
        req.traceContext = this.createTraceContext(req);
        req.startTime = Date.now();
        res.setHeader('traceparent', `00-${req.traceContext.traceId}-${req.traceContext.spanId}-01`);
        res.setHeader('X-Request-ID', req.requestId);
        const originalEnd = res.end;
        res.end = (chunk, encoding, cb) => {
            const duration = Date.now() - req.startTime;
            console.log(JSON.stringify({
                timestamp: new Date().toISOString(),
                level: 'log',
                message: `Response: ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`,
                context: {
                    traceId: req.traceContext.traceId,
                    requestId: req.requestId,
                    method: req.method,
                    url: req.url,
                    statusCode: res.statusCode,
                    duration,
                    ip: req.ip,
                    userAgent: req.get('User-Agent'),
                    userId: req.user?.id,
                },
                service: 'lis-gpb-backend',
                version: '1.0.0',
                environment: process.env.NODE_ENV || 'development',
            }));
            return originalEnd.call(res, chunk, encoding, cb);
        };
        next();
    }
    generateRequestId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 9);
        return `req_${timestamp}_${random}`;
    }
    createTraceContext(req) {
        const traceparent = req.headers['traceparent'];
        if (traceparent) {
            const parts = traceparent.split('-');
            if (parts.length === 4 && parts[0] === '00') {
                return {
                    traceId: parts[1],
                    spanId: parts[2],
                };
            }
        }
        return {
            traceId: (0, crypto_1.randomBytes)(16).toString('hex'),
            spanId: (0, crypto_1.randomBytes)(8).toString('hex'),
        };
    }
};
exports.RequestContextMiddleware = RequestContextMiddleware;
exports.RequestContextMiddleware = RequestContextMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestContextMiddleware);
//# sourceMappingURL=request-context.middleware.js.map