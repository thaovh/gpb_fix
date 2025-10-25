"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_type_entity_1 = require("./entities/department-type.entity");
const department_type_repository_1 = require("./department-type.repository");
const department_type_service_1 = require("./department-type.service");
const department_type_controller_1 = require("./department-type.controller");
const services_module_1 = require("../../shared/services/services.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
const dataloader_module_1 = require("../../shared/dataloaders/dataloader.module");
let DepartmentTypeModule = class DepartmentTypeModule {
};
exports.DepartmentTypeModule = DepartmentTypeModule;
exports.DepartmentTypeModule = DepartmentTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([department_type_entity_1.DepartmentType]),
            services_module_1.ServicesModule,
            dataloader_module_1.DataLoaderModule,
        ],
        controllers: [department_type_controller_1.DepartmentTypeController],
        providers: [
            department_type_service_1.DepartmentTypeService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'IDepartmentTypeRepository',
                useClass: department_type_repository_1.DepartmentTypeRepository,
            },
        ],
        exports: [
            department_type_service_1.DepartmentTypeService,
            'IDepartmentTypeRepository',
        ],
    })
], DepartmentTypeModule);
//# sourceMappingURL=department-type.module.js.map