"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const current_user_context_service_1 = require("./current-user-context.service");
let BaseService = class BaseService {
    constructor(dataSource, currentUserContext) {
        this.dataSource = dataSource;
        this.currentUserContext = currentUserContext;
    }
    async saveWithAudit(entity, entityClass, isUpdate = false) {
        const currentUser = this.currentUserContext.getCurrentUser();
        if (currentUser) {
            if (isUpdate) {
                entity.updatedBy = currentUser.id;
            }
            else {
                entity.createdBy = currentUser.id;
                entity.updatedBy = currentUser.id;
            }
        }
        return this.dataSource.manager.save(entityClass, entity);
    }
    async transactionWithAudit(runInTransaction) {
        return this.dataSource.transaction(async (manager) => {
            const currentUser = this.currentUserContext.getCurrentUser();
            return runInTransaction(manager);
        });
    }
    setAuditFields(entity, isUpdate = false) {
        const currentUser = this.currentUserContext.getCurrentUser();
        if (currentUser) {
            if (isUpdate) {
                entity.updatedBy = currentUser.id;
            }
            else {
                entity.createdBy = currentUser.id;
                entity.updatedBy = currentUser.id;
            }
        }
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        current_user_context_service_1.CurrentUserContextService])
], BaseService);
//# sourceMappingURL=base.service.js.map