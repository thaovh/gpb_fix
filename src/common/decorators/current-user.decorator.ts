import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): CurrentUser => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const user = request.user || request.currentUser;

        if (!user) {
            throw new Error('User not found in request');
        }

        return {
            id: (user as any).id,
            username: (user as any).username,
            email: (user as any).email,
        };
    },
);
