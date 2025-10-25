"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./entities/room.entity");
const room_repository_1 = require("./room.repository");
const room_service_1 = require("./room.service");
const room_controller_1 = require("./room.controller");
const services_module_1 = require("../../shared/services/services.module");
const dataloader_module_1 = require("../../shared/dataloaders/dataloader.module");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let RoomModule = class RoomModule {
};
exports.RoomModule = RoomModule;
exports.RoomModule = RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room]),
            services_module_1.ServicesModule,
            dataloader_module_1.DataLoaderModule,
        ],
        controllers: [room_controller_1.RoomController],
        providers: [
            room_service_1.RoomService,
            current_user_context_service_1.CurrentUserContextService,
            {
                provide: 'IRoomRepository',
                useClass: room_repository_1.RoomRepository,
            },
        ],
        exports: [
            room_service_1.RoomService,
            'IRoomRepository',
        ],
    })
], RoomModule);
//# sourceMappingURL=room.module.js.map