"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ward_entity_1 = require("./entities/ward.entity");
const ward_repository_1 = require("./ward.repository");
const ward_service_1 = require("./ward.service");
const ward_controller_1 = require("./ward.controller");
const province_module_1 = require("../province/province.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let WardModule = class WardModule {
};
exports.WardModule = WardModule;
exports.WardModule = WardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ward_entity_1.Ward]),
            province_module_1.ProvinceModule,
        ],
        controllers: [ward_controller_1.WardController],
        providers: [
            ward_service_1.WardService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'IWardRepository',
                useClass: ward_repository_1.WardRepository,
            },
        ],
        exports: [
            ward_service_1.WardService,
            'IWardRepository',
        ],
    })
], WardModule);
//# sourceMappingURL=ward.module.js.map