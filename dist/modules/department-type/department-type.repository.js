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
exports.DepartmentTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_type_entity_1 = require("./entities/department-type.entity");
let DepartmentTypeRepository = class DepartmentTypeRepository {
    constructor(departmentTypeRepository) {
        this.departmentTypeRepository = departmentTypeRepository;
    }
    async findById(id) {
        return this.departmentTypeRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async findByCode(typeCode) {
        return this.departmentTypeRepository.findOne({
            where: { typeCode, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async save(departmentType) {
        return this.departmentTypeRepository.save(departmentType);
    }
    async delete(id) {
        await this.departmentTypeRepository.softDelete(id);
    }
    async softDelete(id) {
        await this.departmentTypeRepository.softDelete(id);
    }
    async findAll() {
        return this.departmentTypeRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async findActive() {
        return this.departmentTypeRepository.find({
            where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async findInactive() {
        return this.departmentTypeRepository.find({
            where: { isActive: false, deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async findBySortOrder() {
        return this.departmentTypeRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async searchByName(name) {
        return this.departmentTypeRepository.find({
            where: {
                typeName: (0, typeorm_2.Like)(`%${name}%`),
                deletedAt: (0, typeorm_2.IsNull)()
            },
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async searchByCode(code) {
        return this.departmentTypeRepository.find({
            where: {
                typeCode: (0, typeorm_2.Like)(`%${code}%`),
                deletedAt: (0, typeorm_2.IsNull)()
            },
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async searchByKeyword(keyword) {
        return this.departmentTypeRepository.find({
            where: [
                { typeCode: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
                { typeName: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
                { description: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
            ],
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async findWithPagination(limit, offset, sortBy, sortOrder, filters) {
        const queryBuilder = this.departmentTypeRepository
            .createQueryBuilder('departmentType')
            .where('departmentType.deletedAt IS NULL')
            .orderBy(`departmentType.${sortBy || 'sortOrder'}`, sortOrder || 'ASC')
            .limit(limit)
            .offset(offset);
        if (filters?.isActive !== undefined) {
            queryBuilder.andWhere('departmentType.isActive = :isActive', { isActive: filters.isActive });
        }
        if (filters?.search) {
            queryBuilder.andWhere('(departmentType.typeCode ILIKE :search OR departmentType.typeName ILIKE :search OR departmentType.description ILIKE :search)', { search: `%${filters.search}%` });
        }
        return queryBuilder.getManyAndCount();
    }
    async findByIds(ids) {
        return this.departmentTypeRepository.find({
            where: { id: (0, typeorm_2.In)(ids), deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', typeName: 'ASC' },
        });
    }
    async saveMany(departmentTypes) {
        return this.departmentTypeRepository.save(departmentTypes);
    }
    async deleteMany(ids) {
        await this.departmentTypeRepository.softDelete(ids);
    }
    async countTotal() {
        return this.departmentTypeRepository.count({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async countActive() {
        return this.departmentTypeRepository.count({
            where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async countInactive() {
        return this.departmentTypeRepository.count({
            where: { isActive: false, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async countByStatus(isActive) {
        return this.departmentTypeRepository.count({
            where: { isActive, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async existsByCode(typeCode, excludeId) {
        const queryBuilder = this.departmentTypeRepository
            .createQueryBuilder('departmentType')
            .where('departmentType.typeCode = :typeCode', { typeCode })
            .andWhere('departmentType.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('departmentType.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByName(typeName, excludeId) {
        const queryBuilder = this.departmentTypeRepository
            .createQueryBuilder('departmentType')
            .where('departmentType.typeName = :typeName', { typeName })
            .andWhere('departmentType.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('departmentType.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async getNextSortOrder() {
        const result = await this.departmentTypeRepository
            .createQueryBuilder('departmentType')
            .select('MAX(departmentType.sortOrder)', 'maxSortOrder')
            .where('departmentType.deletedAt IS NULL')
            .getRawOne();
        return (result?.maxSortOrder || 0) + 1;
    }
    async getMaxSortOrder() {
        const result = await this.departmentTypeRepository
            .createQueryBuilder('departmentType')
            .select('MAX(departmentType.sortOrder)', 'maxSortOrder')
            .where('departmentType.deletedAt IS NULL')
            .getRawOne();
        return result?.maxSortOrder || 0;
    }
    async reorderSortOrder() {
        const departmentTypes = await this.departmentTypeRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', createdAt: 'ASC' },
        });
        for (let i = 0; i < departmentTypes.length; i++) {
            departmentTypes[i].sortOrder = i + 1;
        }
        await this.departmentTypeRepository.save(departmentTypes);
    }
};
exports.DepartmentTypeRepository = DepartmentTypeRepository;
exports.DepartmentTypeRepository = DepartmentTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_type_entity_1.DepartmentType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentTypeRepository);
//# sourceMappingURL=department-type.repository.js.map