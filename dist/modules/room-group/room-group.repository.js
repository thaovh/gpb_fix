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
exports.RoomGroupRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_group_entity_1 = require("./entities/room-group.entity");
let RoomGroupRepository = class RoomGroupRepository {
    constructor(roomGroupRepository) {
        this.roomGroupRepository = roomGroupRepository;
    }
    async findById(id) {
        return this.roomGroupRepository.findOne({
            where: { id: id, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async findByCode(roomGroupCode) {
        return this.roomGroupRepository.findOne({
            where: { roomGroupCode: roomGroupCode, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async save(roomGroup) {
        return this.roomGroupRepository.save(roomGroup);
    }
    async delete(id) {
        await this.roomGroupRepository.delete(id);
    }
    async softDelete(id) {
        await this.roomGroupRepository.softDelete(id);
    }
    async findAll() {
        return this.roomGroupRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', roomGroupName: 'ASC' },
        });
    }
    async findActive() {
        return this.roomGroupRepository.find({
            where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', roomGroupName: 'ASC' },
        });
    }
    async findInactive() {
        return this.roomGroupRepository.find({
            where: { isActive: false, deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', roomGroupName: 'ASC' },
        });
    }
    async findByIds(ids) {
        return this.roomGroupRepository.find({
            where: { id: (0, typeorm_2.In)(ids), deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', roomGroupName: 'ASC' },
        });
    }
    async searchByKeyword(keyword) {
        return this.roomGroupRepository.find({
            where: [
                { roomGroupCode: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
                { roomGroupName: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
            ],
            order: { sortOrder: 'ASC', roomGroupName: 'ASC' },
        });
    }
    async findWithPagination(limit, offset, sortBy, sortOrder, filters) {
        const queryBuilder = this.roomGroupRepository.createQueryBuilder('roomGroup');
        queryBuilder.where('roomGroup.deletedAt IS NULL');
        if (filters?.isActive !== undefined) {
            queryBuilder.andWhere('roomGroup.isActive = :isActive', { isActive: filters.isActive });
        }
        if (filters?.search) {
            queryBuilder.andWhere('(roomGroup.roomGroupCode LIKE :search OR roomGroup.roomGroupName LIKE :search)', { search: `%${filters.search}%` });
        }
        if (sortBy) {
            queryBuilder.orderBy(`roomGroup.${sortBy}`, sortOrder);
        }
        else {
            queryBuilder.orderBy('roomGroup.sortOrder', 'ASC');
            queryBuilder.addOrderBy('roomGroup.roomGroupName', 'ASC');
        }
        queryBuilder.skip(offset).take(limit);
        return queryBuilder.getManyAndCount();
    }
    async countTotal() {
        return this.roomGroupRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countActive() {
        return this.roomGroupRepository.count({ where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countInactive() {
        return this.roomGroupRepository.count({ where: { isActive: false, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countByStatus(isActive) {
        return this.roomGroupRepository.count({ where: { isActive, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async getNextSortOrder() {
        const maxSortOrder = await this.roomGroupRepository
            .createQueryBuilder('roomGroup')
            .select('MAX(roomGroup.sortOrder)', 'maxSortOrder')
            .getRawOne();
        return (maxSortOrder.maxSortOrder || 0) + 1;
    }
    async existsByCode(roomGroupCode, excludeId) {
        const query = { roomGroupCode: roomGroupCode, deletedAt: (0, typeorm_2.IsNull)() };
        if (excludeId) {
            return this.roomGroupRepository.exists({ where: { ...query, id: (0, typeorm_2.Not)(excludeId) } });
        }
        return this.roomGroupRepository.exists({ where: query });
    }
    async existsByName(roomGroupName, excludeId) {
        const query = { roomGroupName: roomGroupName, deletedAt: (0, typeorm_2.IsNull)() };
        if (excludeId) {
            return this.roomGroupRepository.exists({ where: { ...query, id: (0, typeorm_2.Not)(excludeId) } });
        }
        return this.roomGroupRepository.exists({ where: query });
    }
};
exports.RoomGroupRepository = RoomGroupRepository;
exports.RoomGroupRepository = RoomGroupRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_group_entity_1.RoomGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomGroupRepository);
//# sourceMappingURL=room-group.repository.js.map