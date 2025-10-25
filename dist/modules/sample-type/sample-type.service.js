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
exports.SampleTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const sample_type_entity_1 = require("./entities/sample-type.entity");
const dataloader_service_1 = require("../../shared/dataloaders/dataloader.service");
const app_error_1 = require("../../common/errors/app.error");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let SampleTypeService = class SampleTypeService extends base_service_1.BaseService {
    constructor(sampleTypeRepository, dataSource, currentUserContext, dataLoaderService) {
        super(dataSource, currentUserContext);
        this.sampleTypeRepository = sampleTypeRepository;
        this.dataSource = dataSource;
        this.currentUserContext = currentUserContext;
        this.dataLoaderService = dataLoaderService;
    }
    async createSampleType(createDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const existingByCode = await this.sampleTypeRepository.existsByCode(createDto.typeCode);
            if (existingByCode) {
                throw app_error_1.AppError.conflict('Sample type with this code already exists');
            }
            const existingByName = await this.sampleTypeRepository.existsByName(createDto.typeName);
            if (existingByName) {
                throw app_error_1.AppError.conflict('Sample type with this name already exists');
            }
            const sampleType = new sample_type_entity_1.SampleType();
            sampleType.typeCode = createDto.typeCode;
            sampleType.typeName = createDto.typeName;
            sampleType.shortName = createDto.shortName;
            sampleType.description = createDto.description;
            sampleType.sortOrder = createDto.sortOrder || await this.sampleTypeRepository.getNextSortOrder();
            sampleType.createdBy = currentUser.id;
            sampleType.updatedBy = currentUser.id;
            const savedSampleType = await manager.save(sample_type_entity_1.SampleType, sampleType);
            return savedSampleType.id;
        });
    }
    async updateSampleType(id, updateDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const sampleType = await this.sampleTypeRepository.findById(id);
            if (!sampleType) {
                throw app_error_1.AppError.notFound('Sample type not found');
            }
            if (updateDto.typeCode && updateDto.typeCode !== sampleType.typeCode) {
                const existingByCode = await this.sampleTypeRepository.existsByCode(updateDto.typeCode);
                if (existingByCode) {
                    throw app_error_1.AppError.conflict('Sample type with this code already exists');
                }
            }
            if (updateDto.typeName && updateDto.typeName !== sampleType.typeName) {
                const existingByName = await this.sampleTypeRepository.existsByName(updateDto.typeName);
                if (existingByName) {
                    throw app_error_1.AppError.conflict('Sample type with this name already exists');
                }
            }
            Object.assign(sampleType, updateDto);
            sampleType.updatedBy = currentUser.id;
            await manager.save(sample_type_entity_1.SampleType, sampleType);
        });
    }
    async deleteSampleType(id) {
        return this.transactionWithAudit(async (manager) => {
            const sampleType = await this.sampleTypeRepository.findById(id);
            if (!sampleType) {
                throw app_error_1.AppError.notFound('Sample type not found');
            }
            await this.sampleTypeRepository.delete(id);
        });
    }
    async getSampleTypeById(id) {
        const sampleType = await this.sampleTypeRepository.findById(id);
        if (!sampleType) {
            throw app_error_1.AppError.notFound('Sample type not found');
        }
        return this.mapSampleTypeToResponseDto(sampleType);
    }
    async getSampleTypes(query) {
        const { limit = 10, offset = 0, search } = query;
        const [sampleTypes, total] = await this.sampleTypeRepository.findWithPagination(limit, offset, search);
        return {
            sampleTypes: sampleTypes.map(st => this.mapSampleTypeToResponseDto(st)),
            total,
            limit,
            offset,
        };
    }
    async searchSampleTypes(searchTerm) {
        const [sampleTypes] = await this.sampleTypeRepository.findWithPagination(100, 0, searchTerm);
        return sampleTypes.map(st => this.mapSampleTypeToResponseDto(st));
    }
    async getActiveSampleTypes() {
        const sampleTypes = await this.sampleTypeRepository.findActiveWithSorting();
        return sampleTypes.map(st => this.mapSampleTypeToResponseDto(st));
    }
    mapSampleTypeToResponseDto(sampleType) {
        return {
            id: sampleType.id,
            typeCode: sampleType.typeCode,
            typeName: sampleType.typeName,
            shortName: sampleType.shortName,
            description: sampleType.description,
            sortOrder: sampleType.sortOrder,
            displayName: sampleType.getDisplayName(),
            createdAt: sampleType.createdAt,
            updatedAt: sampleType.updatedAt,
            createdBy: sampleType.createdBy,
            updatedBy: sampleType.updatedBy,
            version: sampleType.version,
        };
    }
};
exports.SampleTypeService = SampleTypeService;
exports.SampleTypeService = SampleTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ISampleTypeRepository')),
    __param(1, (0, common_1.Inject)(typeorm_1.DataSource)),
    __param(2, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource,
        current_user_context_service_1.CurrentUserContextService,
        dataloader_service_1.DataLoaderService])
], SampleTypeService);
//# sourceMappingURL=sample-type.service.js.map