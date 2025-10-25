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
exports.ProvinceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const province_entity_1 = require("./entities/province.entity");
let ProvinceRepository = class ProvinceRepository {
    constructor(provinceRepository) {
        this.provinceRepository = provinceRepository;
    }
    async findById(id) {
        return this.provinceRepository.findOne({
            where: { id, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async findByCode(provinceCode) {
        return this.provinceRepository.findOne({
            where: { provinceCode, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async save(province) {
        return this.provinceRepository.save(province);
    }
    async delete(id) {
        await this.provinceRepository.delete(id);
    }
    async softDelete(id) {
        await this.provinceRepository.update(id, {
            deletedAt: new Date(),
        });
    }
    async findAll() {
        return this.provinceRepository.find({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
            order: { sortOrder: 'ASC', provinceName: 'ASC' },
        });
    }
    async findActive() {
        return this.provinceRepository.find({
            where: { isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
            order: { sortOrder: 'ASC', provinceName: 'ASC' },
        });
    }
    async findInactive() {
        return this.provinceRepository.find({
            where: { isActive: false, deletedAt: (0, typeorm_1.IsNull)() },
            order: { sortOrder: 'ASC', provinceName: 'ASC' },
        });
    }
    async findBySortOrder() {
        return this.provinceRepository.find({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
            order: { sortOrder: 'ASC' },
        });
    }
    async searchByName(name) {
        return this.provinceRepository.find({
            where: {
                provinceName: (0, typeorm_1.Like)(`%${name}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            order: { sortOrder: 'ASC', provinceName: 'ASC' },
        });
    }
    async searchByCode(code) {
        return this.provinceRepository.find({
            where: {
                provinceCode: (0, typeorm_1.Like)(`%${code}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            order: { sortOrder: 'ASC', provinceName: 'ASC' },
        });
    }
    async searchByShortName(shortName) {
        return this.provinceRepository.find({
            where: {
                shortName: (0, typeorm_1.Like)(`%${shortName}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            order: { sortOrder: 'ASC', provinceName: 'ASC' },
        });
    }
    async searchByKeyword(keyword) {
        return this.provinceRepository
            .createQueryBuilder('province')
            .where('province.deletedAt IS NULL')
            .andWhere('(province.provinceName LIKE :keyword OR province.provinceCode LIKE :keyword OR province.shortName LIKE :keyword)', { keyword: `%${keyword}%` })
            .orderBy('province.sortOrder', 'ASC')
            .addOrderBy('province.provinceName', 'ASC')
            .getMany();
    }
    async findWithPagination(limit, offset, sortBy = 'sortOrder', sortOrder = 'ASC', filters) {
        const queryBuilder = this.provinceRepository
            .createQueryBuilder('province')
            .where('province.deletedAt IS NULL');
        if (filters?.isActive !== undefined) {
            queryBuilder.andWhere('province.isActive = :isActive', { isActive: filters.isActive });
        }
        if (filters?.search) {
            queryBuilder.andWhere('(province.provinceName LIKE :search OR province.provinceCode LIKE :search OR province.shortName LIKE :search)', { search: `%${filters.search}%` });
        }
        const validSortFields = ['sortOrder', 'provinceName', 'provinceCode', 'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'sortOrder';
        queryBuilder.orderBy(`province.${sortField}`, sortOrder);
        queryBuilder.take(limit).skip(offset);
        return queryBuilder.getManyAndCount();
    }
    async findByIds(ids) {
        return this.provinceRepository.find({
            where: { id: (0, typeorm_1.In)(ids), deletedAt: (0, typeorm_1.IsNull)() },
            order: { sortOrder: 'ASC', provinceName: 'ASC' },
        });
    }
    async saveMany(provinces) {
        return this.provinceRepository.save(provinces);
    }
    async deleteMany(ids) {
        await this.provinceRepository.update({ id: (0, typeorm_1.In)(ids) }, { deletedAt: new Date() });
    }
    async countTotal() {
        return this.provinceRepository.count({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countActive() {
        return this.provinceRepository.count({
            where: { isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countInactive() {
        return this.provinceRepository.count({
            where: { isActive: false, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countByStatus(isActive) {
        return this.provinceRepository.count({
            where: { isActive, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async existsByCode(provinceCode, excludeId) {
        const queryBuilder = this.provinceRepository
            .createQueryBuilder('province')
            .where('province.provinceCode = :provinceCode', { provinceCode })
            .andWhere('province.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('province.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByName(provinceName, excludeId) {
        const queryBuilder = this.provinceRepository
            .createQueryBuilder('province')
            .where('province.provinceName = :provinceName', { provinceName })
            .andWhere('province.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('province.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByShortName(shortName, excludeId) {
        const queryBuilder = this.provinceRepository
            .createQueryBuilder('province')
            .where('province.shortName = :shortName', { shortName })
            .andWhere('province.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('province.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async getNextSortOrder() {
        const result = await this.provinceRepository
            .createQueryBuilder('province')
            .select('MAX(province.sortOrder)', 'maxSortOrder')
            .where('province.deletedAt IS NULL')
            .getRawOne();
        return (result?.maxSortOrder || 0) + 1;
    }
    async getMaxSortOrder() {
        const result = await this.provinceRepository
            .createQueryBuilder('province')
            .select('MAX(province.sortOrder)', 'maxSortOrder')
            .where('province.deletedAt IS NULL')
            .getRawOne();
        return result?.maxSortOrder || 0;
    }
    async reorderSortOrder() {
        const provinces = await this.findAll();
        const updatePromises = provinces.map((province, index) => {
            province.sortOrder = index + 1;
            return this.save(province);
        });
        await Promise.all(updatePromises);
    }
};
exports.ProvinceRepository = ProvinceRepository;
exports.ProvinceRepository = ProvinceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(province_entity_1.Province)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProvinceRepository);
//# sourceMappingURL=province.repository.js.map