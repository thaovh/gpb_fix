"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sample_type_entity_1 = require("./entities/sample-type.entity");
const sample_type_repository_1 = require("./sample-type.repository");
const sample_type_service_1 = require("./sample-type.service");
const sample_type_controller_1 = require("./sample-type.controller");
const services_module_1 = require("../../shared/services/services.module");
const dataloader_module_1 = require("../../shared/dataloaders/dataloader.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let SampleTypeModule = class SampleTypeModule {
};
exports.SampleTypeModule = SampleTypeModule;
exports.SampleTypeModule = SampleTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sample_type_entity_1.SampleType]),
            services_module_1.ServicesModule,
            dataloader_module_1.DataLoaderModule,
        ],
        controllers: [sample_type_controller_1.SampleTypeController],
        providers: [
            sample_type_service_1.SampleTypeService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'ISampleTypeRepository',
                useClass: sample_type_repository_1.SampleTypeRepository,
            },
        ],
        exports: [
            sample_type_service_1.SampleTypeService,
            'ISampleTypeRepository',
        ],
    })
], SampleTypeModule);
//# sourceMappingURL=sample-type.module.js.map