"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleReceptionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sample_reception_entity_1 = require("./entities/sample-reception.entity");
const sample_reception_repository_1 = require("./sample-reception.repository");
const sample_reception_service_1 = require("./sample-reception.service");
const sample_reception_controller_1 = require("./sample-reception.controller");
const services_module_1 = require("../../shared/services/services.module");
const dataloader_module_1 = require("../../shared/dataloaders/dataloader.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
const sample_type_module_1 = require("../sample-type/sample-type.module");
let SampleReceptionModule = class SampleReceptionModule {
};
exports.SampleReceptionModule = SampleReceptionModule;
exports.SampleReceptionModule = SampleReceptionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sample_reception_entity_1.SampleReception]),
            services_module_1.ServicesModule,
            dataloader_module_1.DataLoaderModule,
            sample_type_module_1.SampleTypeModule,
        ],
        controllers: [sample_reception_controller_1.SampleReceptionController],
        providers: [
            sample_reception_service_1.SampleReceptionService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'ISampleReceptionRepository',
                useClass: sample_reception_repository_1.SampleReceptionRepository,
            },
        ],
        exports: [
            sample_reception_service_1.SampleReceptionService,
            'ISampleReceptionRepository',
        ],
    })
], SampleReceptionModule);
//# sourceMappingURL=sample-reception.module.js.map