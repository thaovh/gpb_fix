import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export interface RequestWithContext extends Request {
    requestId: string;
    traceContext: {
        traceId: string;
        spanId: string;
    };
    startTime: number;
    user?: any;
}
export declare class RequestContextMiddleware implements NestMiddleware {
    use(req: RequestWithContext, res: Response, next: NextFunction): void;
    private generateRequestId;
    private createTraceContext;
}
