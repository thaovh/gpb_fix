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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./entities/room.entity");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
const dataloader_service_1 = require("../../shared/dataloaders/dataloader.service");
let RoomService = class RoomService extends base_service_1.BaseService {
    constructor(roomRepository, dataSource, currentUserContext, dataLoaderService) {
        super(dataSource, currentUserContext);
        this.roomRepository = roomRepository;
        this.dataSource = dataSource;
        this.currentUserContext = currentUserContext;
        this.dataLoaderService = dataLoaderService;
    }
    async createRoom(createRoomDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const existingByCode = await this.roomRepository.existsByCode(createRoomDto.roomCode);
            if (existingByCode) {
                throw new common_1.ConflictException('Room with this code already exists');
            }
            const existingByNameInDepartment = await this.roomRepository.existsByNameInDepartment(createRoomDto.roomName, createRoomDto.departmentId);
            if (existingByNameInDepartment) {
                throw new common_1.ConflictException('Room with this name already exists in department');
            }
            const room = new room_entity_1.Room();
            room.roomCode = createRoomDto.roomCode;
            room.roomName = createRoomDto.roomName;
            room.roomAddress = createRoomDto.roomAddress;
            room.departmentId = createRoomDto.departmentId;
            room.roomGroupId = createRoomDto.roomGroupId;
            room.description = createRoomDto.description;
            room.isActive = createRoomDto.isActive ?? true;
            room.sortOrder = createRoomDto.sortOrder ?? 0;
            this.setAuditFields(room, false);
            const savedRoom = await manager.save(room_entity_1.Room, room);
            return savedRoom.id;
        });
    }
    async updateRoom(id, updateRoomDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const room = await this.roomRepository.findById(id);
            if (!room) {
                throw new common_1.NotFoundException('Room not found');
            }
            if (updateRoomDto.roomName && updateRoomDto.roomName !== room.roomName) {
                const targetDepartmentId = updateRoomDto.departmentId || room.departmentId;
                const existingByNameInDepartment = await this.roomRepository.existsByNameInDepartment(updateRoomDto.roomName, targetDepartmentId, id);
                if (existingByNameInDepartment) {
                    throw new common_1.ConflictException('Room with this name already exists in department');
                }
            }
            Object.assign(room, updateRoomDto);
            this.setAuditFields(room, true);
            await manager.save(room_entity_1.Room, room);
        });
    }
    async deleteRoom(id, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const room = await this.roomRepository.findById(id);
            if (!room) {
                throw new common_1.NotFoundException('Room not found');
            }
            await this.roomRepository.delete(id);
        });
    }
    async getRoomById(id) {
        const room = await this.roomRepository.findById(id);
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        return this.mapRoomToResponseDto(room);
    }
    async getRooms(query) {
        const { limit = 10, offset = 0, isActive, departmentId, roomGroupId } = query;
        let rooms;
        let total;
        if (departmentId) {
            [rooms, total] = await this.roomRepository.findByDepartmentId(departmentId, limit, offset);
        }
        else if (roomGroupId) {
            [rooms, total] = await this.roomRepository.findByRoomGroupId(roomGroupId, limit, offset);
        }
        else if (isActive !== undefined) {
            if (isActive) {
                [rooms, total] = await this.roomRepository.findActive(limit, offset);
            }
            else {
                [rooms, total] = await this.roomRepository.findAll(limit, offset);
            }
        }
        else {
            [rooms, total] = await this.roomRepository.findAll(limit, offset);
        }
        return {
            rooms: rooms.map(room => this.mapRoomToResponseDto(room)),
            total,
            limit,
            offset,
        };
    }
    async searchRooms(searchDto) {
        const { searchTerm, limit = 10, offset = 0, isActive, departmentId, roomGroupId } = searchDto;
        const [byCode, byName, byAddress, byDescription] = await Promise.all([
            this.roomRepository.searchByCode(searchTerm),
            this.roomRepository.searchByName(searchTerm),
            this.roomRepository.searchByAddress(searchTerm),
            this.roomRepository.searchByDescription(searchTerm),
        ]);
        const allRooms = [...byCode, ...byName, ...byAddress, ...byDescription];
        const uniqueRooms = allRooms.filter((room, index, self) => index === self.findIndex(r => r.id === room.id));
        let filteredRooms = uniqueRooms;
        if (isActive !== undefined) {
            filteredRooms = filteredRooms.filter(room => room.isActive === isActive);
        }
        if (departmentId) {
            filteredRooms = filteredRooms.filter(room => room.departmentId === departmentId);
        }
        if (roomGroupId) {
            filteredRooms = filteredRooms.filter(room => room.roomGroupId === roomGroupId);
        }
        const total = filteredRooms.length;
        const paginatedRooms = filteredRooms.slice(offset, offset + limit);
        return {
            rooms: paginatedRooms.map(room => this.mapRoomToResponseDto(room)),
            total,
            limit,
            offset,
        };
    }
    async getRoomsByDepartment(query) {
        const { departmentId, limit = 10, offset = 0, isActive } = query;
        let [rooms, total] = await this.roomRepository.findByDepartmentId(departmentId, limit, offset);
        if (isActive !== undefined) {
            rooms = rooms.filter(room => room.isActive === isActive);
            total = rooms.length;
        }
        return {
            rooms: rooms.map(room => this.mapRoomToResponseDto(room)),
            total,
            limit,
            offset,
        };
    }
    async getRoomsByGroup(query) {
        const { roomGroupId, limit = 10, offset = 0, isActive } = query;
        let [rooms, total] = await this.roomRepository.findByRoomGroupId(roomGroupId, limit, offset);
        if (isActive !== undefined) {
            rooms = rooms.filter(room => room.isActive === isActive);
            total = rooms.length;
        }
        return {
            rooms: rooms.map(room => this.mapRoomToResponseDto(room)),
            total,
            limit,
            offset,
        };
    }
    async getRoomStats() {
        const [total, active, byDepartment, byRoomGroup] = await Promise.all([
            this.roomRepository.countTotal(),
            this.roomRepository.countActive(),
            this.getRoomStatsByDepartment(),
            this.getRoomStatsByRoomGroup(),
        ]);
        return {
            total,
            active,
            inactive: total - active,
            byDepartment,
            byRoomGroup,
        };
    }
    async getRoomStatsByDepartment() {
        return {};
    }
    async getRoomStatsByRoomGroup() {
        return {};
    }
    mapRoomToResponseDto(room) {
        return {
            id: room.id,
            roomCode: room.roomCode,
            roomName: room.roomName,
            roomAddress: room.roomAddress,
            departmentId: room.departmentId,
            roomGroupId: room.roomGroupId,
            description: room.description,
            isActive: room.isActive,
            sortOrder: room.sortOrder,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt,
            department: room.department ? {
                id: room.department.id,
                departmentCode: room.department.departmentCode,
                departmentName: room.department.departmentName,
            } : undefined,
            roomGroup: room.roomGroup ? {
                id: room.roomGroup.id,
                roomGroupCode: room.roomGroup.roomGroupCode,
                roomGroupName: room.roomGroup.roomGroupName,
            } : undefined,
        };
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IRoomRepository')),
    __param(1, (0, common_1.Inject)(typeorm_1.DataSource)),
    __param(2, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource,
        current_user_context_service_1.CurrentUserContextService,
        dataloader_service_1.DataLoaderService])
], RoomService);
//# sourceMappingURL=room.service.js.map