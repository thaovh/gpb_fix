"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserContextService = void 0;
const common_1 = require("@nestjs/common");
let CurrentUserContextService = class CurrentUserContextService {
    constructor() {
        this.currentUser = null;
    }
    setCurrentUser(user) {
        this.currentUser = user;
    }
    getCurrentUser() {
        return this.currentUser;
    }
    getCurrentUserId() {
        return this.currentUser?.id || null;
    }
    clearCurrentUser() {
        this.currentUser = null;
    }
};
exports.CurrentUserContextService = CurrentUserContextService;
exports.CurrentUserContextService = CurrentUserContextService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], CurrentUserContextService);
//# sourceMappingURL=current-user-context.service.js.map