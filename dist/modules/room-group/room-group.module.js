"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGroupModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_group_entity_1 = require("./entities/room-group.entity");
const room_group_repository_1 = require("./room-group.repository");
const room_group_service_1 = require("./room-group.service");
const room_group_controller_1 = require("./room-group.controller");
const services_module_1 = require("../../shared/services/services.module");
const dataloader_module_1 = require("../../shared/dataloaders/dataloader.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let RoomGroupModule = class RoomGroupModule {
};
exports.RoomGroupModule = RoomGroupModule;
exports.RoomGroupModule = RoomGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([room_group_entity_1.RoomGroup]),
            services_module_1.ServicesModule,
            dataloader_module_1.DataLoaderModule,
        ],
        controllers: [room_group_controller_1.RoomGroupController],
        providers: [
            room_group_service_1.RoomGroupService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'IRoomGroupRepository',
                useClass: room_group_repository_1.RoomGroupRepository,
            },
        ],
        exports: [
            room_group_service_1.RoomGroupService,
            'IRoomGroupRepository',
        ],
    })
], RoomGroupModule);
//# sourceMappingURL=room-group.module.js.map