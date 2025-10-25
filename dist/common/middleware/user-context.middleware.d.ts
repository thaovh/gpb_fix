import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: CurrentUser;
        }
    }
}
export declare class UserContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
