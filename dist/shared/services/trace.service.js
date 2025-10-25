"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let TraceService = class TraceService {
    constructor() {
        this.traceIdLength = 32;
        this.spanIdLength = 16;
    }
    generateTraceId() {
        return (0, crypto_1.randomBytes)(this.traceIdLength).toString('hex');
    }
    generateSpanId() {
        return (0, crypto_1.randomBytes)(this.spanIdLength).toString('hex');
    }
    createTraceContext(parentContext) {
        return {
            traceId: parentContext?.traceId || this.generateTraceId(),
            spanId: this.generateSpanId(),
            parentSpanId: parentContext?.spanId,
            baggage: parentContext?.baggage || {},
        };
    }
    extractFromHeaders(headers) {
        try {
            const traceparent = headers['traceparent'];
            if (!traceparent) {
                return null;
            }
            const parts = traceparent.split('-');
            if (parts.length !== 4 || parts[0] !== '00') {
                return null;
            }
            const [, traceId, spanId] = parts;
            return {
                traceId,
                spanId,
                baggage: this.extractBaggage(headers),
            };
        }
        catch (error) {
            return null;
        }
    }
    injectToHeaders(context) {
        const headers = {};
        headers['traceparent'] = `00-${context.traceId}-${context.spanId}-01`;
        if (context.baggage && Object.keys(context.baggage).length > 0) {
            headers['tracestate'] = Object.entries(context.baggage)
                .map(([key, value]) => `${key}=${value}`)
                .join(',');
        }
        return headers;
    }
    extractBaggage(headers) {
        const tracestate = headers['tracestate'];
        if (!tracestate) {
            return {};
        }
        const baggage = {};
        const items = tracestate.split(',');
        for (const item of items) {
            const [key, value] = item.split('=');
            if (key && value) {
                baggage[key.trim()] = value.trim();
            }
        }
        return baggage;
    }
    createChildSpan(parentContext) {
        return {
            traceId: parentContext.traceId,
            spanId: this.generateSpanId(),
            parentSpanId: parentContext.spanId,
            baggage: { ...parentContext.baggage },
        };
    }
    addBaggage(context, key, value) {
        return {
            ...context,
            baggage: {
                ...context.baggage,
                [key]: value,
            },
        };
    }
    getBaggage(context, key) {
        return context.baggage?.[key];
    }
    isValidContext(context) {
        return !!(context.traceId && context.spanId);
    }
    formatForLogging(context) {
        return `traceId=${context.traceId}, spanId=${context.spanId}`;
    }
    createFromRequest(request) {
        const headers = request.headers || {};
        const existingContext = this.extractFromHeaders(headers);
        if (existingContext) {
            return existingContext;
        }
        return this.createTraceContext();
    }
    startTrace() {
        return this.createTraceContext();
    }
    continueTrace(traceId, parentSpanId) {
        return {
            traceId,
            spanId: this.generateSpanId(),
            parentSpanId,
            baggage: {},
        };
    }
};
exports.TraceService = TraceService;
exports.TraceService = TraceService = __decorate([
    (0, common_1.Injectable)()
], TraceService);
//# sourceMappingURL=trace.service.js.map