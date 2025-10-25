"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const province_entity_1 = require("./entities/province.entity");
const province_repository_1 = require("./province.repository");
const province_service_1 = require("./province.service");
const province_controller_1 = require("./province.controller");
const services_module_1 = require("../../shared/services/services.module");
const dataloader_module_1 = require("../../shared/dataloaders/dataloader.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let ProvinceModule = class ProvinceModule {
};
exports.ProvinceModule = ProvinceModule;
exports.ProvinceModule = ProvinceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([province_entity_1.Province]),
            services_module_1.ServicesModule,
            dataloader_module_1.DataLoaderModule,
        ],
        controllers: [province_controller_1.ProvinceController],
        providers: [
            province_service_1.ProvinceService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'IProvinceRepository',
                useClass: province_repository_1.ProvinceRepository,
            },
        ],
        exports: [
            province_service_1.ProvinceService,
            'IProvinceRepository',
        ],
    })
], ProvinceModule);
//# sourceMappingURL=province.module.js.map