"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user || request.currentUser;
    if (!user) {
        throw new Error('User not found in request');
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
});
//# sourceMappingURL=current-user.decorator.js.map