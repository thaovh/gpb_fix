export interface TraceContext {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    baggage?: Record<string, string>;
}
export declare class TraceService {
    private readonly traceIdLength;
    private readonly spanIdLength;
    generateTraceId(): string;
    generateSpanId(): string;
    createTraceContext(parentContext?: TraceContext): TraceContext;
    extractFromHeaders(headers: Record<string, string | string[] | undefined>): TraceContext | null;
    injectToHeaders(context: TraceContext): Record<string, string>;
    private extractBaggage;
    createChildSpan(parentContext: TraceContext): TraceContext;
    addBaggage(context: TraceContext, key: string, value: string): TraceContext;
    getBaggage(context: TraceContext, key: string): string | undefined;
    isValidContext(context: TraceContext): boolean;
    formatForLogging(context: TraceContext): string;
    createFromRequest(request: any): TraceContext;
    startTrace(): TraceContext;
    continueTrace(traceId: string, parentSpanId?: string): TraceContext;
}
