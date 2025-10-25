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
exports.DepartmentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
let DepartmentRepository = class DepartmentRepository {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async findById(id) {
        return this.departmentRepository.findOne({
            where: { id: id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent', 'children'],
        });
    }
    async findByCode(departmentCode) {
        return this.departmentRepository.findOne({
            where: { departmentCode: departmentCode, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent', 'children'],
        });
    }
    async save(department) {
        return this.departmentRepository.save(department);
    }
    async delete(id) {
        await this.departmentRepository.delete(id);
    }
    async softDelete(id) {
        await this.departmentRepository.softDelete(id);
    }
    async findAll() {
        return this.departmentRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findActive() {
        return this.departmentRepository.find({
            where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findInactive() {
        return this.departmentRepository.find({
            where: { isActive: false, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findByIds(ids) {
        return this.departmentRepository.find({
            where: { id: (0, typeorm_2.In)(ids), deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findRootDepartments() {
        return this.departmentRepository.find({
            where: { parentDepartmentId: (0, typeorm_2.IsNull)(), deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'children'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findChildrenByParentId(parentId) {
        return this.departmentRepository.find({
            where: { parentDepartmentId: parentId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent', 'children'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findDescendantsByParentId(parentId) {
        const children = await this.findChildrenByParentId(parentId);
        const descendants = [...children];
        for (const child of children) {
            const grandChildren = await this.findDescendantsByParentId(child.id);
            descendants.push(...grandChildren);
        }
        return descendants;
    }
    async findAncestorsByDepartmentId(departmentId) {
        const department = await this.findById(departmentId);
        if (!department || !department.parentDepartmentId) {
            return [];
        }
        const ancestors = [];
        let currentParentId = department.parentDepartmentId;
        while (currentParentId) {
            const parent = await this.findById(currentParentId);
            if (parent) {
                ancestors.push(parent);
                currentParentId = parent.parentDepartmentId;
            }
            else {
                break;
            }
        }
        return ancestors;
    }
    async findByBranchId(branchId) {
        return this.departmentRepository.find({
            where: { branchId: branchId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findByDepartmentTypeId(departmentTypeId) {
        return this.departmentRepository.find({
            where: { departmentTypeId: departmentTypeId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findByBranchIds(branchIds) {
        return this.departmentRepository.find({
            where: { branchId: (0, typeorm_2.In)(branchIds), deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findByDepartmentTypeIds(departmentTypeIds) {
        return this.departmentRepository.find({
            where: { departmentTypeId: (0, typeorm_2.In)(departmentTypeIds), deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async searchByKeyword(keyword) {
        return this.departmentRepository.find({
            where: [
                { departmentCode: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
                { departmentName: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
                { shortName: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
                { headOfDepartment: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
                { headNurse: (0, typeorm_2.Like)(`%${keyword}%`), deletedAt: (0, typeorm_2.IsNull)() },
            ],
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async searchByHeadOfDepartment(headOfDepartment) {
        return this.departmentRepository.find({
            where: { headOfDepartment: (0, typeorm_2.Like)(`%${headOfDepartment}%`), deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async searchByHeadNurse(headNurse) {
        return this.departmentRepository.find({
            where: { headNurse: (0, typeorm_2.Like)(`%${headNurse}%`), deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['branch', 'departmentType', 'parent'],
            order: { sortOrder: 'ASC', departmentName: 'ASC' },
        });
    }
    async findWithPagination(limit, offset, sortBy, sortOrder, filters) {
        const queryBuilder = this.departmentRepository.createQueryBuilder('department');
        queryBuilder.leftJoinAndSelect('department.branch', 'branch');
        queryBuilder.leftJoinAndSelect('department.departmentType', 'departmentType');
        queryBuilder.leftJoinAndSelect('department.parent', 'parent');
        queryBuilder.where('department.deletedAt IS NULL');
        if (filters?.isActive !== undefined) {
            queryBuilder.andWhere('department.isActive = :isActive', { isActive: filters.isActive });
        }
        if (filters?.branchId) {
            queryBuilder.andWhere('department.branchId = :branchId', { branchId: filters.branchId });
        }
        if (filters?.departmentTypeId) {
            queryBuilder.andWhere('department.departmentTypeId = :departmentTypeId', { departmentTypeId: filters.departmentTypeId });
        }
        if (filters?.parentDepartmentId !== undefined) {
            if (filters.parentDepartmentId === null) {
                queryBuilder.andWhere('department.parentDepartmentId IS NULL');
            }
            else {
                queryBuilder.andWhere('department.parentDepartmentId = :parentDepartmentId', { parentDepartmentId: filters.parentDepartmentId });
            }
        }
        if (filters?.search) {
            queryBuilder.andWhere('(department.departmentCode LIKE :search OR department.departmentName LIKE :search OR department.shortName LIKE :search OR department.headOfDepartment LIKE :search OR department.headNurse LIKE :search)', { search: `%${filters.search}%` });
        }
        if (sortBy) {
            queryBuilder.orderBy(`department.${sortBy}`, sortOrder);
        }
        else {
            queryBuilder.orderBy('department.sortOrder', 'ASC');
            queryBuilder.addOrderBy('department.departmentName', 'ASC');
        }
        queryBuilder.skip(offset).take(limit);
        return queryBuilder.getManyAndCount();
    }
    async countTotal() {
        return this.departmentRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countActive() {
        return this.departmentRepository.count({ where: { isActive: true, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countInactive() {
        return this.departmentRepository.count({ where: { isActive: false, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countByStatus(isActive) {
        return this.departmentRepository.count({ where: { isActive, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countByBranch(branchId) {
        return this.departmentRepository.count({ where: { branchId, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countByDepartmentType(departmentTypeId) {
        return this.departmentRepository.count({ where: { departmentTypeId, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async countByParent(parentDepartmentId) {
        return this.departmentRepository.count({ where: { parentDepartmentId, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async getNextSortOrder() {
        const maxSortOrder = await this.departmentRepository
            .createQueryBuilder('department')
            .select('MAX(department.sortOrder)', 'maxSortOrder')
            .getRawOne();
        return (maxSortOrder.maxSortOrder || 0) + 1;
    }
    async existsByCode(departmentCode, excludeId) {
        const query = { departmentCode: departmentCode, deletedAt: (0, typeorm_2.IsNull)() };
        if (excludeId) {
            return this.departmentRepository.exists({ where: { ...query, id: (0, typeorm_2.Not)(excludeId) } });
        }
        return this.departmentRepository.exists({ where: query });
    }
    async existsByName(departmentName, excludeId) {
        const query = { departmentName: departmentName, deletedAt: (0, typeorm_2.IsNull)() };
        if (excludeId) {
            return this.departmentRepository.exists({ where: { ...query, id: (0, typeorm_2.Not)(excludeId) } });
        }
        return this.departmentRepository.exists({ where: query });
    }
    async existsByShortName(shortName, excludeId) {
        const query = { shortName: shortName, deletedAt: (0, typeorm_2.IsNull)() };
        if (excludeId) {
            return this.departmentRepository.exists({ where: { ...query, id: (0, typeorm_2.Not)(excludeId) } });
        }
        return this.departmentRepository.exists({ where: query });
    }
    async isCircularReference(departmentId, parentId) {
        if (departmentId === parentId) {
            return true;
        }
        const ancestors = await this.findAncestorsByDepartmentId(departmentId);
        return ancestors.some(ancestor => ancestor.id === parentId);
    }
    async getMaxHierarchyDepth() {
        const departments = await this.findAll();
        let maxDepth = 0;
        for (const dept of departments) {
            const depth = dept.getHierarchyLevel();
            if (depth > maxDepth) {
                maxDepth = depth;
            }
        }
        return maxDepth;
    }
};
exports.DepartmentRepository = DepartmentRepository;
exports.DepartmentRepository = DepartmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentRepository);
//# sourceMappingURL=department.repository.js.map