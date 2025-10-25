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
exports.RoomGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const room_group_entity_1 = require("./entities/room-group.entity");
const app_error_1 = require("../../common/errors/app.error");
const dataloader_service_1 = require("../../shared/dataloaders/dataloader.service");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let RoomGroupService = class RoomGroupService extends base_service_1.BaseService {
    constructor(roomGroupRepository, dataSource, dataLoaderService, currentUserContext) {
        super(dataSource, currentUserContext);
        this.roomGroupRepository = roomGroupRepository;
        this.dataSource = dataSource;
        this.dataLoaderService = dataLoaderService;
        this.currentUserContext = currentUserContext;
    }
    async createRoomGroup(createDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const existingByCode = await this.roomGroupRepository.existsByCode(createDto.roomGroupCode);
            if (existingByCode) {
                throw app_error_1.AppError.conflict('Room group with this code already exists');
            }
            const existingByName = await this.roomGroupRepository.existsByName(createDto.roomGroupName);
            if (existingByName) {
                throw app_error_1.AppError.conflict('Room group with this name already exists');
            }
            const roomGroup = new room_group_entity_1.RoomGroup();
            roomGroup.roomGroupCode = createDto.roomGroupCode;
            roomGroup.roomGroupName = createDto.roomGroupName;
            roomGroup.sortOrder = createDto.sortOrder ?? await this.roomGroupRepository.getNextSortOrder();
            this.setAuditFields(roomGroup, false);
            const savedRoomGroup = await manager.save(room_group_entity_1.RoomGroup, roomGroup);
            return savedRoomGroup.id;
        });
    }
    async updateRoomGroup(id, updateDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const roomGroup = await this.roomGroupRepository.findById(id);
            if (!roomGroup) {
                throw app_error_1.AppError.notFound('Room group not found');
            }
            if (updateDto.roomGroupCode && updateDto.roomGroupCode !== roomGroup.roomGroupCode) {
                const exists = await this.roomGroupRepository.existsByCode(updateDto.roomGroupCode, id);
                if (exists) {
                    throw app_error_1.AppError.conflict('Room group with this code already exists');
                }
            }
            if (updateDto.roomGroupName && updateDto.roomGroupName !== roomGroup.roomGroupName) {
                const exists = await this.roomGroupRepository.existsByName(updateDto.roomGroupName, id);
                if (exists) {
                    throw app_error_1.AppError.conflict('Room group with this name already exists');
                }
            }
            Object.assign(roomGroup, updateDto);
            this.setAuditFields(roomGroup, true);
            await manager.save(room_group_entity_1.RoomGroup, roomGroup);
        });
    }
    async deleteRoomGroup(id, hardDelete = false) {
        const roomGroup = await this.roomGroupRepository.findById(id);
        if (!roomGroup) {
            throw app_error_1.AppError.notFound('Room group not found');
        }
        if (hardDelete) {
            await this.roomGroupRepository.delete(id);
        }
        else {
            await this.roomGroupRepository.softDelete(id);
        }
    }
    async getRoomGroupById(id) {
        const roomGroup = await this.roomGroupRepository.findById(id);
        if (!roomGroup) {
            throw app_error_1.AppError.notFound('Room group not found');
        }
        return this.mapToResponseDto(roomGroup);
    }
    async getRoomGroups(query) {
        const { limit = 10, offset = 0, search, isActive, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [roomGroups, total] = await this.roomGroupRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search });
        return {
            roomGroups: roomGroups.map(rg => this.mapToResponseDto(rg)),
            total,
            limit,
            offset,
        };
    }
    async searchRoomGroups(query) {
        const { keyword, limit = 10, offset = 0, isActive, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [roomGroups, total] = await this.roomGroupRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search: keyword });
        return {
            roomGroups: roomGroups.map(rg => this.mapToResponseDto(rg)),
            total,
            limit,
            offset,
        };
    }
    async getRoomGroupsWithStats(query) {
        const { limit = 10, offset = 0 } = query;
        const [roomGroups, total] = await this.roomGroupRepository.findWithPagination(limit, offset, 'sortOrder', 'ASC', { isActive: true });
        const loaders = this.dataLoaderService.createLoaders();
        const roomGroupsWithStats = await Promise.all(roomGroups.map(async (roomGroup) => {
            return {
                ...this.mapToResponseDto(roomGroup),
            };
        }));
        return {
            roomGroups: roomGroupsWithStats,
            total,
            limit,
            offset,
        };
    }
    async getStatsOverview() {
        const total = await this.roomGroupRepository.countTotal();
        const active = await this.roomGroupRepository.countActive();
        return {
            total,
            active,
            inactive: total - active,
        };
    }
    async reorderRoomGroups(roomGroupIds) {
        console.log('Reordering room groups:', roomGroupIds);
    }
    mapToResponseDto(roomGroup) {
        return {
            id: roomGroup.id,
            roomGroupCode: roomGroup.roomGroupCode,
            roomGroupName: roomGroup.roomGroupName,
            displayName: roomGroup.getDisplayName(),
            sortOrder: roomGroup.sortOrder,
            isActive: roomGroup.isActive,
            version: roomGroup.version,
            createdAt: roomGroup.createdAt,
            updatedAt: roomGroup.updatedAt,
        };
    }
};
exports.RoomGroupService = RoomGroupService;
exports.RoomGroupService = RoomGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IRoomGroupRepository')),
    __param(1, (0, common_1.Inject)(typeorm_1.DataSource)),
    __param(3, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource,
        dataloader_service_1.DataLoaderService,
        current_user_context_service_1.CurrentUserContextService])
], RoomGroupService);
//# sourceMappingURL=room-group.service.js.map