"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    useFactory: () => ({
        secret: process.env.JWT_SECRET || 'your-super-secret-key-here',
        signOptions: {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
            issuer: 'lis-gpb-backend',
            audience: 'lis-gpb-users',
        },
    }),
};
//# sourceMappingURL=jwt.config.js.map