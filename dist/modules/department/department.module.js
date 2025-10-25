"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_entity_1 = require("./entities/department.entity");
const department_repository_1 = require("./department.repository");
const department_service_1 = require("./department.service");
const department_controller_1 = require("./department.controller");
const services_module_1 = require("../../shared/services/services.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
const dataloader_module_1 = require("../../shared/dataloaders/dataloader.module");
let DepartmentModule = class DepartmentModule {
};
exports.DepartmentModule = DepartmentModule;
exports.DepartmentModule = DepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([department_entity_1.Department]),
            services_module_1.ServicesModule,
            dataloader_module_1.DataLoaderModule,
        ],
        controllers: [department_controller_1.DepartmentController],
        providers: [
            department_service_1.DepartmentService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'IDepartmentRepository',
                useClass: department_repository_1.DepartmentRepository,
            },
        ],
        exports: [
            department_service_1.DepartmentService,
            'IDepartmentRepository',
        ],
    })
], DepartmentModule);
//# sourceMappingURL=department.module.js.map