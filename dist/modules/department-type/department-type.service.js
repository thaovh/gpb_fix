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
exports.DepartmentTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const department_type_entity_1 = require("./entities/department-type.entity");
const dataloader_service_1 = require("../../shared/dataloaders/dataloader.service");
const app_error_1 = require("../../common/errors/app.error");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let DepartmentTypeService = class DepartmentTypeService extends base_service_1.BaseService {
    constructor(departmentTypeRepository, dataSource, dataLoaderService, currentUserContext) {
        super(dataSource, currentUserContext);
        this.departmentTypeRepository = departmentTypeRepository;
        this.dataSource = dataSource;
        this.dataLoaderService = dataLoaderService;
        this.currentUserContext = currentUserContext;
    }
    async createDepartmentType(createDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const existingByCode = await this.departmentTypeRepository.existsByCode(createDto.typeCode);
            if (existingByCode) {
                throw app_error_1.AppError.conflict('Department type with this code already exists');
            }
            const existingByName = await this.departmentTypeRepository.existsByName(createDto.typeName);
            if (existingByName) {
                throw app_error_1.AppError.conflict('Department type with this name already exists');
            }
            const departmentType = new department_type_entity_1.DepartmentType();
            departmentType.typeCode = createDto.typeCode;
            departmentType.typeName = createDto.typeName;
            departmentType.description = createDto.description;
            departmentType.sortOrder = createDto.sortOrder ?? await this.getNextSortOrder();
            this.setAuditFields(departmentType, false);
            const savedDepartmentType = await manager.save(department_type_entity_1.DepartmentType, departmentType);
            return savedDepartmentType.id;
        });
    }
    async updateDepartmentType(id, updateDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const departmentType = await this.departmentTypeRepository.findById(id);
            if (!departmentType) {
                throw app_error_1.AppError.notFound('Department type not found');
            }
            if (updateDto.typeName && updateDto.typeName !== departmentType.typeName) {
                const exists = await this.departmentTypeRepository.existsByName(updateDto.typeName, id);
                if (exists) {
                    throw app_error_1.AppError.conflict('Department type with this name already exists');
                }
            }
            Object.assign(departmentType, updateDto);
            this.setAuditFields(departmentType, true);
            await manager.save(department_type_entity_1.DepartmentType, departmentType);
        });
    }
    async deleteDepartmentType(id, hardDelete = false) {
        const departmentType = await this.departmentTypeRepository.findById(id);
        if (!departmentType) {
            throw app_error_1.AppError.notFound('Department type not found');
        }
        if (hardDelete) {
            await this.departmentTypeRepository.delete(id);
        }
        else {
            await this.departmentTypeRepository.softDelete(id);
        }
    }
    async getDepartmentTypeById(id) {
        const departmentType = await this.departmentTypeRepository.findById(id);
        if (!departmentType) {
            throw app_error_1.AppError.notFound('Department type not found');
        }
        return this.mapDepartmentTypeToResponseDto(departmentType);
    }
    async getDepartmentTypes(query) {
        const { limit = 10, offset = 0, search, isActive, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [departmentTypes, total] = await this.departmentTypeRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search });
        return {
            departmentTypes: departmentTypes.map(departmentType => this.mapDepartmentTypeToResponseDto(departmentType)),
            total,
            limit,
            offset,
        };
    }
    async getDepartmentTypesWithStats(query) {
        const { limit = 10, offset = 0, search, isActive, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [departmentTypes, total] = await this.departmentTypeRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search });
        const loaders = this.dataLoaderService.createLoaders();
        const departmentTypesWithStats = await Promise.all(departmentTypes.map(async (departmentType) => {
            return {
                ...this.mapDepartmentTypeToResponseDto(departmentType),
            };
        }));
        return {
            departmentTypes: departmentTypesWithStats,
            total,
            limit,
            offset,
        };
    }
    async getStatsOverview() {
        const total = await this.departmentTypeRepository.countTotal();
        const active = await this.departmentTypeRepository.countActive();
        const inactive = await this.departmentTypeRepository.countInactive();
        return {
            total,
            active,
            inactive,
            activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
        };
    }
    async reorderDepartmentTypes(departmentTypeIds) {
        return this.dataSource.transaction(async (manager) => {
            for (let i = 0; i < departmentTypeIds.length; i++) {
                const departmentType = await this.departmentTypeRepository.findById(departmentTypeIds[i]);
                if (departmentType) {
                    departmentType.sortOrder = i + 1;
                    await manager.save(department_type_entity_1.DepartmentType, departmentType);
                }
            }
        });
    }
    async getNextSortOrder() {
        return this.departmentTypeRepository.getNextSortOrder();
    }
    mapDepartmentTypeToResponseDto(departmentType) {
        return {
            id: departmentType.id,
            typeCode: departmentType.typeCode,
            typeName: departmentType.typeName,
            description: departmentType.description,
            displayName: departmentType.getDisplayName(),
            sortOrder: departmentType.sortOrder,
            isActive: departmentType.isActive,
            version: departmentType.version,
            createdAt: departmentType.createdAt,
            updatedAt: departmentType.updatedAt,
        };
    }
};
exports.DepartmentTypeService = DepartmentTypeService;
exports.DepartmentTypeService = DepartmentTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IDepartmentTypeRepository')),
    __param(1, (0, common_1.Inject)(typeorm_1.DataSource)),
    __param(3, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource,
        dataloader_service_1.DataLoaderService,
        current_user_context_service_1.CurrentUserContextService])
], DepartmentTypeService);
//# sourceMappingURL=department-type.service.js.map