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
exports.WardRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const ward_entity_1 = require("./entities/ward.entity");
let WardRepository = class WardRepository {
    constructor(wardRepository) {
        this.wardRepository = wardRepository;
    }
    async findById(id) {
        return this.wardRepository.findOne({
            where: { id, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
        });
    }
    async findByCode(wardCode) {
        return this.wardRepository.findOne({
            where: { wardCode, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
        });
    }
    async save(ward) {
        return this.wardRepository.save(ward);
    }
    async delete(id) {
        await this.wardRepository.delete(id);
    }
    async softDelete(id) {
        await this.wardRepository.update(id, {
            deletedAt: new Date(),
        });
    }
    async findAll() {
        return this.wardRepository.find({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async findActive() {
        return this.wardRepository.find({
            where: { isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async findInactive() {
        return this.wardRepository.find({
            where: { isActive: false, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async findBySortOrder() {
        return this.wardRepository.find({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC' },
        });
    }
    async findByProvinceId(provinceId) {
        return this.wardRepository.find({
            where: { provinceId, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async findActiveByProvinceId(provinceId) {
        return this.wardRepository.find({
            where: { provinceId, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async findByProvinceCode(provinceCode) {
        return this.wardRepository
            .createQueryBuilder('ward')
            .leftJoinAndSelect('ward.province', 'province')
            .where('ward.deletedAt IS NULL')
            .andWhere('province.provinceCode = :provinceCode', { provinceCode })
            .orderBy('ward.sortOrder', 'ASC')
            .addOrderBy('ward.wardName', 'ASC')
            .getMany();
    }
    async findActiveByProvinceCode(provinceCode) {
        return this.wardRepository
            .createQueryBuilder('ward')
            .leftJoinAndSelect('ward.province', 'province')
            .where('ward.deletedAt IS NULL')
            .andWhere('ward.isActive = :isActive', { isActive: true })
            .andWhere('province.provinceCode = :provinceCode', { provinceCode })
            .orderBy('ward.sortOrder', 'ASC')
            .addOrderBy('ward.wardName', 'ASC')
            .getMany();
    }
    async searchByName(name) {
        return this.wardRepository.find({
            where: {
                wardName: (0, typeorm_1.Like)(`%${name}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async searchByCode(code) {
        return this.wardRepository.find({
            where: {
                wardCode: (0, typeorm_1.Like)(`%${code}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async searchByShortName(shortName) {
        return this.wardRepository.find({
            where: {
                shortName: (0, typeorm_1.Like)(`%${shortName}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async searchByKeyword(keyword) {
        return this.wardRepository
            .createQueryBuilder('ward')
            .leftJoinAndSelect('ward.province', 'province')
            .where('ward.deletedAt IS NULL')
            .andWhere('(ward.wardName LIKE :keyword OR ward.wardCode LIKE :keyword OR ward.shortName LIKE :keyword)', { keyword: `%${keyword}%` })
            .orderBy('ward.sortOrder', 'ASC')
            .addOrderBy('ward.wardName', 'ASC')
            .getMany();
    }
    async searchByProvinceAndKeyword(provinceId, keyword) {
        return this.wardRepository
            .createQueryBuilder('ward')
            .leftJoinAndSelect('ward.province', 'province')
            .where('ward.deletedAt IS NULL')
            .andWhere('ward.provinceId = :provinceId', { provinceId })
            .andWhere('(ward.wardName LIKE :keyword OR ward.wardCode LIKE :keyword OR ward.shortName LIKE :keyword)', { keyword: `%${keyword}%` })
            .orderBy('ward.sortOrder', 'ASC')
            .addOrderBy('ward.wardName', 'ASC')
            .getMany();
    }
    async findWithPagination(limit, offset, sortBy = 'sortOrder', sortOrder = 'ASC', filters) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .leftJoinAndSelect('ward.province', 'province')
            .where('ward.deletedAt IS NULL');
        if (filters?.isActive !== undefined) {
            queryBuilder.andWhere('ward.isActive = :isActive', { isActive: filters.isActive });
        }
        if (filters?.provinceId) {
            queryBuilder.andWhere('ward.provinceId = :provinceId', { provinceId: filters.provinceId });
        }
        if (filters?.search) {
            queryBuilder.andWhere('(ward.wardName LIKE :search OR ward.wardCode LIKE :search OR ward.shortName LIKE :search)', { search: `%${filters.search}%` });
        }
        const validSortFields = ['sortOrder', 'wardName', 'wardCode', 'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'sortOrder';
        queryBuilder.orderBy(`ward.${sortField}`, sortOrder);
        queryBuilder.take(limit).skip(offset);
        return queryBuilder.getManyAndCount();
    }
    async findByIds(ids) {
        return this.wardRepository.find({
            where: { id: (0, typeorm_1.In)(ids), deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async findByProvinceIds(provinceIds) {
        return this.wardRepository.find({
            where: { provinceId: (0, typeorm_1.In)(provinceIds), deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province'],
            order: { sortOrder: 'ASC', wardName: 'ASC' },
        });
    }
    async saveMany(wards) {
        return this.wardRepository.save(wards);
    }
    async deleteMany(ids) {
        await this.wardRepository.update({ id: (0, typeorm_1.In)(ids) }, { deletedAt: new Date() });
    }
    async countTotal() {
        return this.wardRepository.count({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countActive() {
        return this.wardRepository.count({
            where: { isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countInactive() {
        return this.wardRepository.count({
            where: { isActive: false, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countByStatus(isActive) {
        return this.wardRepository.count({
            where: { isActive, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countByProvince(provinceId) {
        return this.wardRepository.count({
            where: { provinceId, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countActiveByProvince(provinceId) {
        return this.wardRepository.count({
            where: { provinceId, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async existsByCode(wardCode, excludeId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .where('ward.wardCode = :wardCode', { wardCode })
            .andWhere('ward.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('ward.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByName(wardName, excludeId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .where('ward.wardName = :wardName', { wardName })
            .andWhere('ward.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('ward.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByShortName(shortName, excludeId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .where('ward.shortName = :shortName', { shortName })
            .andWhere('ward.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('ward.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByNameInProvince(wardName, provinceId, excludeId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .where('ward.wardName = :wardName', { wardName })
            .andWhere('ward.provinceId = :provinceId', { provinceId })
            .andWhere('ward.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('ward.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByShortNameInProvince(shortName, provinceId, excludeId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .where('ward.shortName = :shortName', { shortName })
            .andWhere('ward.provinceId = :provinceId', { provinceId })
            .andWhere('ward.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('ward.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async getNextSortOrder(provinceId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .select('MAX(ward.sortOrder)', 'maxSortOrder')
            .where('ward.deletedAt IS NULL');
        if (provinceId) {
            queryBuilder.andWhere('ward.provinceId = :provinceId', { provinceId });
        }
        const result = await queryBuilder.getRawOne();
        return (result?.maxSortOrder || 0) + 1;
    }
    async getMaxSortOrder(provinceId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .select('MAX(ward.sortOrder)', 'maxSortOrder')
            .where('ward.deletedAt IS NULL');
        if (provinceId) {
            queryBuilder.andWhere('ward.provinceId = :provinceId', { provinceId });
        }
        const result = await queryBuilder.getRawOne();
        return result?.maxSortOrder || 0;
    }
    async reorderSortOrder(provinceId) {
        const queryBuilder = this.wardRepository
            .createQueryBuilder('ward')
            .where('ward.deletedAt IS NULL');
        if (provinceId) {
            queryBuilder.andWhere('ward.provinceId = :provinceId', { provinceId });
        }
        const wards = await queryBuilder
            .orderBy('ward.sortOrder', 'ASC')
            .getMany();
        const updatePromises = wards.map((ward, index) => {
            ward.sortOrder = index + 1;
            return this.save(ward);
        });
        await Promise.all(updatePromises);
    }
};
exports.WardRepository = WardRepository;
exports.WardRepository = WardRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(ward_entity_1.Ward)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], WardRepository);
//# sourceMappingURL=ward.repository.js.map