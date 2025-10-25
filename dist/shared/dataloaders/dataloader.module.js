"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLoaderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dataloader_service_1 = require("./dataloader.service");
const user_entity_1 = require("../../modules/user/entities/user.entity");
const province_entity_1 = require("../../modules/province/entities/province.entity");
const ward_entity_1 = require("../../modules/ward/entities/ward.entity");
const branch_entity_1 = require("../../modules/branch/entities/branch.entity");
const department_entity_1 = require("../../modules/department/entities/department.entity");
const room_group_entity_1 = require("../../modules/room-group/entities/room-group.entity");
const user_repository_1 = require("../../modules/user/user.repository");
const province_repository_1 = require("../../modules/province/province.repository");
const ward_repository_1 = require("../../modules/ward/ward.repository");
const branch_repository_1 = require("../../modules/branch/branch.repository");
const department_repository_1 = require("../../modules/department/department.repository");
const room_group_repository_1 = require("../../modules/room-group/room-group.repository");
let DataLoaderModule = class DataLoaderModule {
};
exports.DataLoaderModule = DataLoaderModule;
exports.DataLoaderModule = DataLoaderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, province_entity_1.Province, ward_entity_1.Ward, branch_entity_1.Branch, department_entity_1.Department, room_group_entity_1.RoomGroup]),
        ],
        providers: [
            dataloader_service_1.DataLoaderService,
            {
                provide: 'IUserRepository',
                useClass: user_repository_1.UserRepository,
            },
            {
                provide: 'IProvinceRepository',
                useClass: province_repository_1.ProvinceRepository,
            },
            {
                provide: 'IWardRepository',
                useClass: ward_repository_1.WardRepository,
            },
            {
                provide: 'IBranchRepository',
                useClass: branch_repository_1.BranchRepository,
            },
            {
                provide: 'IDepartmentRepository',
                useClass: department_repository_1.DepartmentRepository,
            },
            {
                provide: 'IRoomGroupRepository',
                useClass: room_group_repository_1.RoomGroupRepository,
            },
        ],
        exports: [dataloader_service_1.DataLoaderService],
    })
], DataLoaderModule);
//# sourceMappingURL=dataloader.module.js.map