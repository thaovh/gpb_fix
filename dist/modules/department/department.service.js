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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
const app_error_1 = require("../../common/errors/app.error");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
const dataloader_service_1 = require("../../shared/dataloaders/dataloader.service");
let DepartmentService = class DepartmentService extends base_service_1.BaseService {
    constructor(departmentRepository, dataSource, currentUserContext, dataLoaderService) {
        super(dataSource, currentUserContext);
        this.departmentRepository = departmentRepository;
        this.dataSource = dataSource;
        this.currentUserContext = currentUserContext;
        this.dataLoaderService = dataLoaderService;
    }
    async createDepartment(createDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const existingByCode = await this.departmentRepository.existsByCode(createDto.departmentCode);
            if (existingByCode) {
                throw app_error_1.AppError.conflict('Department with this code already exists');
            }
            const existingByName = await this.departmentRepository.existsByName(createDto.departmentName);
            if (existingByName) {
                throw app_error_1.AppError.conflict('Department with this name already exists');
            }
            if (createDto.shortName) {
                const existingByShortName = await this.departmentRepository.existsByShortName(createDto.shortName);
                if (existingByShortName) {
                    throw app_error_1.AppError.conflict('Department with this short name already exists');
                }
            }
            if (createDto.parentDepartmentId) {
                const isCircular = await this.departmentRepository.isCircularReference('', createDto.parentDepartmentId);
                if (isCircular) {
                    throw app_error_1.AppError.conflict('Circular reference detected in department hierarchy');
                }
            }
            const department = new department_entity_1.Department();
            department.departmentCode = createDto.departmentCode;
            department.departmentName = createDto.departmentName;
            department.branchId = createDto.branchId;
            department.headOfDepartment = createDto.headOfDepartment;
            department.headNurse = createDto.headNurse;
            department.parentDepartmentId = createDto.parentDepartmentId;
            department.shortName = createDto.shortName;
            department.departmentTypeId = createDto.departmentTypeId;
            department.sortOrder = createDto.sortOrder ?? await this.departmentRepository.getNextSortOrder();
            department.createdBy = currentUser.id;
            department.updatedBy = currentUser.id;
            const savedDepartment = await manager.save(department_entity_1.Department, department);
            return savedDepartment.id;
        });
    }
    async updateDepartment(id, updateDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const department = await this.departmentRepository.findById(id);
            if (!department) {
                throw app_error_1.AppError.notFound('Department not found');
            }
            if (updateDto.departmentCode && updateDto.departmentCode !== department.departmentCode) {
                const exists = await this.departmentRepository.existsByCode(updateDto.departmentCode, id);
                if (exists) {
                    throw app_error_1.AppError.conflict('Department with this code already exists');
                }
            }
            if (updateDto.departmentName && updateDto.departmentName !== department.departmentName) {
                const exists = await this.departmentRepository.existsByName(updateDto.departmentName, id);
                if (exists) {
                    throw app_error_1.AppError.conflict('Department with this name already exists');
                }
            }
            if (updateDto.shortName && updateDto.shortName !== department.shortName) {
                const exists = await this.departmentRepository.existsByShortName(updateDto.shortName, id);
                if (exists) {
                    throw app_error_1.AppError.conflict('Department with this short name already exists');
                }
            }
            if (updateDto.parentDepartmentId !== undefined && updateDto.parentDepartmentId !== department.parentDepartmentId) {
                if (updateDto.parentDepartmentId) {
                    const isCircular = await this.departmentRepository.isCircularReference(id, updateDto.parentDepartmentId);
                    if (isCircular) {
                        throw app_error_1.AppError.conflict('Circular reference detected in department hierarchy');
                    }
                }
            }
            Object.assign(department, updateDto);
            department.updatedBy = currentUser.id;
            await manager.save(department_entity_1.Department, department);
        });
    }
    async deleteDepartment(id, hardDelete = false) {
        const department = await this.departmentRepository.findById(id);
        if (!department) {
            throw app_error_1.AppError.notFound('Department not found');
        }
        const children = await this.departmentRepository.findChildrenByParentId(id);
        if (children.length > 0) {
            throw app_error_1.AppError.conflict('Cannot delete department with children. Please delete children first.');
        }
        if (hardDelete) {
            await this.departmentRepository.delete(id);
        }
        else {
            await this.departmentRepository.softDelete(id);
        }
    }
    async getDepartmentById(id) {
        const department = await this.departmentRepository.findById(id);
        if (!department) {
            throw app_error_1.AppError.notFound('Department not found');
        }
        return this.mapToResponseDto(department);
    }
    async getDepartments(query) {
        const { limit = 10, offset = 0, search, isActive, branchId, departmentTypeId, parentDepartmentId, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [departments, total] = await this.departmentRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, branchId, departmentTypeId, parentDepartmentId, search });
        return {
            departments: departments.map(dept => this.mapToResponseDto(dept)),
            total,
            limit,
            offset,
        };
    }
    async searchDepartments(query) {
        const { keyword, limit = 10, offset = 0, isActive, branchId, departmentTypeId, parentDepartmentId, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [departments, total] = await this.departmentRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, branchId, departmentTypeId, parentDepartmentId, search: keyword });
        return {
            departments: departments.map(dept => this.mapToResponseDto(dept)),
            total,
            limit,
            offset,
        };
    }
    async getDepartmentsByBranch(branchId) {
        const departments = await this.departmentRepository.findByBranchId(branchId);
        return departments.map(dept => this.mapToResponseDto(dept));
    }
    async getDepartmentsByType(departmentTypeId) {
        const departments = await this.departmentRepository.findByDepartmentTypeId(departmentTypeId);
        return departments.map(dept => this.mapToResponseDto(dept));
    }
    async getDepartmentHierarchy() {
        const rootDepartments = await this.departmentRepository.findRootDepartments();
        return rootDepartments.map(dept => this.mapToResponseDto(dept));
    }
    async getDepartmentChildren(parentId) {
        const children = await this.departmentRepository.findChildrenByParentId(parentId);
        return children.map(dept => this.mapToResponseDto(dept));
    }
    async getDepartmentsWithStats(query) {
        const { limit = 10, offset = 0 } = query;
        const [departments, total] = await this.departmentRepository.findWithPagination(limit, offset, 'sortOrder', 'ASC', { isActive: true });
        const loaders = this.dataLoaderService.createLoaders();
        const departmentsWithStats = await Promise.all(departments.map(async (department) => {
            return {
                ...this.mapToResponseDto(department),
            };
        }));
        return {
            departments: departmentsWithStats,
            total,
            limit,
            offset,
        };
    }
    async getStatsOverview() {
        const total = await this.departmentRepository.countTotal();
        const active = await this.departmentRepository.countActive();
        return {
            total,
            active,
            inactive: total - active,
        };
    }
    async getStatsByBranch(branchId) {
        const total = await this.departmentRepository.countByBranch(branchId);
        const active = await this.departmentRepository.countByStatus(true);
        const inactive = await this.departmentRepository.countByStatus(false);
        return {
            branchId,
            total,
            active,
            inactive,
        };
    }
    async getStatsByType(departmentTypeId) {
        const total = await this.departmentRepository.countByDepartmentType(departmentTypeId);
        const active = await this.departmentRepository.countByStatus(true);
        const inactive = await this.departmentRepository.countByStatus(false);
        return {
            departmentTypeId,
            total,
            active,
            inactive,
        };
    }
    async reorderDepartments(departmentIds) {
        console.log('Reordering departments:', departmentIds);
    }
    async validateHierarchy(departmentId, parentId) {
        return !(await this.departmentRepository.isCircularReference(departmentId, parentId));
    }
    mapToResponseDto(department) {
        return {
            id: department.id,
            departmentCode: department.departmentCode,
            departmentName: department.departmentName,
            displayName: department.getDisplayName(),
            branchId: department.branchId,
            branchName: department.branch?.branchName,
            headOfDepartment: department.headOfDepartment,
            headNurse: department.headNurse,
            parentDepartmentId: department.parentDepartmentId,
            parentDepartmentName: department.parent?.departmentName,
            shortName: department.shortName,
            departmentTypeId: department.departmentTypeId,
            departmentTypeName: department.departmentType?.typeName,
            sortOrder: department.sortOrder,
            isActive: department.isActive,
            version: department.version,
            createdAt: department.createdAt,
            updatedAt: department.updatedAt,
            hierarchyLevel: department.getHierarchyLevel(),
            isRoot: department.isRootDepartment(),
            hasChildren: department.hasChildren(),
        };
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IDepartmentRepository')),
    __param(1, (0, common_1.Inject)(typeorm_1.DataSource)),
    __param(2, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource,
        current_user_context_service_1.CurrentUserContextService,
        dataloader_service_1.DataLoaderService])
], DepartmentService);
//# sourceMappingURL=department.service.js.map