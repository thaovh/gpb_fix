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
exports.RoomRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("./entities/room.entity");
let RoomRepository = class RoomRepository {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async findById(id) {
        return this.roomRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async save(room) {
        return this.roomRepository.save(room);
    }
    async delete(id) {
        await this.roomRepository.softDelete(id);
    }
    async findAll(limit = 10, offset = 0) {
        return this.roomRepository.findAndCount({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            take: limit,
            skip: offset,
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async findByDepartmentId(departmentId, limit = 10, offset = 0) {
        return this.roomRepository.findAndCount({
            where: { departmentId, deletedAt: (0, typeorm_2.IsNull)() },
            take: limit,
            skip: offset,
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async findByRoomGroupId(roomGroupId, limit = 10, offset = 0) {
        return this.roomRepository.findAndCount({
            where: { roomGroupId, deletedAt: (0, typeorm_2.IsNull)() },
            take: limit,
            skip: offset,
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async findActive(limit = 10, offset = 0) {
        return this.roomRepository.findAndCount({
            where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() },
            take: limit,
            skip: offset,
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async searchByCode(roomCode) {
        return this.roomRepository.find({
            where: {
                roomCode: (0, typeorm_2.Like)(`%${roomCode}%`),
                deletedAt: (0, typeorm_2.IsNull)()
            },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async searchByName(roomName) {
        return this.roomRepository.find({
            where: {
                roomName: (0, typeorm_2.Like)(`%${roomName}%`),
                deletedAt: (0, typeorm_2.IsNull)()
            },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async searchByAddress(address) {
        return this.roomRepository.find({
            where: {
                roomAddress: (0, typeorm_2.Like)(`%${address}%`),
                deletedAt: (0, typeorm_2.IsNull)()
            },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async searchByDescription(description) {
        return this.roomRepository.find({
            where: {
                description: (0, typeorm_2.Like)(`%${description}%`),
                deletedAt: (0, typeorm_2.IsNull)()
            },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async existsByCode(roomCode, excludeId) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .where('room.roomCode = :roomCode', { roomCode })
            .andWhere('room.deletedAt IS NULL');
        if (excludeId) {
            query.andWhere('room.id != :excludeId', { excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
    async existsByName(roomName, excludeId) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .where('room.roomName = :roomName', { roomName })
            .andWhere('room.deletedAt IS NULL');
        if (excludeId) {
            query.andWhere('room.id != :excludeId', { excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
    async existsByNameInDepartment(roomName, departmentId, excludeId) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .where('room.roomName = :roomName', { roomName })
            .andWhere('room.departmentId = :departmentId', { departmentId })
            .andWhere('room.deletedAt IS NULL');
        if (excludeId) {
            query.andWhere('room.id != :excludeId', { excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
    async countByDepartment(departmentId) {
        return this.roomRepository.count({
            where: { departmentId, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async countByRoomGroup(roomGroupId) {
        return this.roomRepository.count({
            where: { roomGroupId, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async countActive() {
        return this.roomRepository.count({
            where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async countTotal() {
        return this.roomRepository.count({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async findByIds(ids) {
        return this.roomRepository.find({
            where: { id: (0, typeorm_2.In)(ids), deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async findByDepartmentIds(departmentIds) {
        return this.roomRepository.find({
            where: { departmentId: (0, typeorm_2.In)(departmentIds), deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async findByRoomGroupIds(roomGroupIds) {
        return this.roomRepository.find({
            where: { roomGroupId: (0, typeorm_2.In)(roomGroupIds), deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
};
exports.RoomRepository = RoomRepository;
exports.RoomRepository = RoomRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomRepository);
//# sourceMappingURL=room.repository.js.map