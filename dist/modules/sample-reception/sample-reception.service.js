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
exports.SampleReceptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const sample_reception_entity_1 = require("./entities/sample-reception.entity");
const dataloader_service_1 = require("../../shared/dataloaders/dataloader.service");
const app_error_1 = require("../../common/errors/app.error");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let SampleReceptionService = class SampleReceptionService extends base_service_1.BaseService {
    constructor(sampleReceptionRepository, sampleTypeRepository, dataSource, currentUserContext, dataLoaderService) {
        super(dataSource, currentUserContext);
        this.sampleReceptionRepository = sampleReceptionRepository;
        this.sampleTypeRepository = sampleTypeRepository;
        this.dataSource = dataSource;
        this.currentUserContext = currentUserContext;
        this.dataLoaderService = dataLoaderService;
    }
    async createSampleReception(createDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const sampleType = await this.sampleTypeRepository.findByCode(createDto.sampleTypeCode);
            if (!sampleType) {
                throw app_error_1.AppError.notFound('Sample type not found');
            }
            const receptionCode = await this.generateReceptionCode(sampleType.typeCode, sampleType.id);
            if (!sampleType.allowDuplicate) {
                const existingReception = await this.sampleReceptionRepository.findByReceptionCode(receptionCode);
                if (existingReception) {
                    throw app_error_1.AppError.conflict('Reception code already exists');
                }
            }
            const reception = new sample_reception_entity_1.SampleReception();
            reception.receptionCode = receptionCode;
            reception.sampleTypeId = sampleType.id;
            reception.receptionDate = new Date();
            reception.sequenceNumber = await this.getNextSequenceNumber(sampleType.id, new Date(), sampleType.resetPeriod);
            reception.createdBy = currentUser.id;
            reception.updatedBy = currentUser.id;
            const savedReception = await manager.save(sample_reception_entity_1.SampleReception, reception);
            return savedReception.id;
        });
    }
    async deleteSampleReception(id) {
        return this.transactionWithAudit(async (manager) => {
            const reception = await this.sampleReceptionRepository.findById(id);
            if (!reception) {
                throw app_error_1.AppError.notFound('Sample reception not found');
            }
            await this.sampleReceptionRepository.delete(id);
        });
    }
    async getSampleReceptionById(id) {
        const reception = await this.sampleReceptionRepository.findById(id);
        if (!reception) {
            throw app_error_1.AppError.notFound('Sample reception not found');
        }
        return this.mapReceptionToResponseDto(reception);
    }
    async getSampleReceptions(query) {
        const { limit = 10, offset = 0, search, sortBy = 'receptionDate', sortOrder = 'DESC' } = query;
        const [receptions, total] = await this.sampleReceptionRepository.findWithPagination(limit, offset, search);
        return {
            receptions: receptions.map(r => this.mapReceptionToResponseDto(r)),
            total,
            limit,
            offset,
        };
    }
    async generateReceptionCode(sampleTypeCode, sampleTypeId, date) {
        const sampleType = await this.sampleTypeRepository.findById(sampleTypeId);
        if (!sampleType) {
            throw app_error_1.AppError.notFound('Sample type not found');
        }
        const targetDate = date || new Date();
        const dateStr = this.formatDateByResetPeriod(targetDate, sampleType.resetPeriod);
        const nextSequence = await this.getNextSequenceNumber(sampleTypeId, targetDate, sampleType.resetPeriod);
        const paddedSequence = nextSequence.toString().padStart(sampleType.codeWidth, '0');
        return `${sampleType.codePrefix}${dateStr}.${paddedSequence}`;
    }
    async generateCodePreview(generateDto) {
        const targetDate = generateDto.date ? new Date(generateDto.date) : new Date();
        const sampleType = await this.sampleTypeRepository.findByCode(generateDto.sampleTypeCode);
        if (!sampleType) {
            throw app_error_1.AppError.notFound('Sample type not found');
        }
        const dateStr = this.formatDateByResetPeriod(targetDate, sampleType.resetPeriod);
        const nextSequence = await this.getNextSequenceNumber(sampleType.id, targetDate, sampleType.resetPeriod);
        const paddedSequence = nextSequence.toString().padStart(sampleType.codeWidth, '0');
        const receptionCode = `${sampleType.codePrefix}${dateStr}.${paddedSequence}`;
        return {
            receptionCode,
            sampleTypeCode: generateDto.sampleTypeCode,
            date: dateStr,
            nextSequence,
            codeGenerationConfig: {
                codePrefix: sampleType.codePrefix,
                codeWidth: sampleType.codeWidth,
                allowDuplicate: sampleType.allowDuplicate,
                resetPeriod: sampleType.resetPeriod,
            },
        };
    }
    async getTodayReceptions() {
        const receptions = await this.sampleReceptionRepository.findTodayReceptions();
        return receptions.map(r => this.mapReceptionToResponseDto(r));
    }
    async getReceptionsByDateRange(startDate, endDate) {
        const receptions = await this.sampleReceptionRepository.findByDateRange(startDate, endDate);
        return receptions.map(r => this.mapReceptionToResponseDto(r));
    }
    async getCodeGenerationConfig(sampleTypeId) {
        const sampleType = await this.sampleTypeRepository.findById(sampleTypeId);
        if (!sampleType) {
            throw app_error_1.AppError.notFound('Sample type not found');
        }
        return {
            sampleTypeId: sampleType.id,
            sampleTypeCode: sampleType.typeCode,
            sampleTypeName: sampleType.typeName,
            codeGenerationConfig: {
                codePrefix: sampleType.codePrefix,
                codeWidth: sampleType.codeWidth,
                allowDuplicate: sampleType.allowDuplicate,
                resetPeriod: sampleType.resetPeriod,
            },
            examples: {
                daily: this.formatDateByResetPeriod(new Date(), 'DAILY'),
                monthly: this.formatDateByResetPeriod(new Date(), 'MONTHLY'),
                yearly: this.formatDateByResetPeriod(new Date(), 'YEARLY'),
                never: this.formatDateByResetPeriod(new Date(), 'NEVER'),
            },
            currentDate: new Date().toISOString(),
        };
    }
    async getNextSequenceNumber(sampleTypeId, date, resetPeriod) {
        const targetDate = date || new Date();
        return await this.sampleReceptionRepository.getNextSequenceNumber(sampleTypeId, targetDate, resetPeriod);
    }
    formatDateByResetPeriod(date, resetPeriod) {
        switch (resetPeriod) {
            case 'DAILY':
                return date.toISOString().slice(0, 10).replace(/-/g, '');
            case 'MONTHLY':
                return date.toISOString().slice(0, 7).replace(/-/g, '');
            case 'YEARLY':
                return date.toISOString().slice(0, 4);
            case 'NEVER':
                return '';
            default:
                return date.toISOString().slice(0, 7).replace(/-/g, '');
        }
    }
    mapReceptionToResponseDto(reception) {
        return {
            id: reception.id,
            receptionCode: reception.receptionCode,
            sampleTypeCode: reception.sampleType?.typeCode || '',
            sampleTypeName: reception.sampleType?.typeName || '',
            receptionDate: reception.receptionDate,
            sequenceNumber: reception.sequenceNumber,
            createdAt: reception.createdAt,
            updatedAt: reception.updatedAt,
            createdBy: reception.createdBy,
            updatedBy: reception.updatedBy,
            version: reception.version,
        };
    }
};
exports.SampleReceptionService = SampleReceptionService;
exports.SampleReceptionService = SampleReceptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ISampleReceptionRepository')),
    __param(1, (0, common_1.Inject)('ISampleTypeRepository')),
    __param(2, (0, common_1.Inject)(typeorm_1.DataSource)),
    __param(3, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [Object, Object, typeorm_1.DataSource,
        current_user_context_service_1.CurrentUserContextService,
        dataloader_service_1.DataLoaderService])
], SampleReceptionService);
//# sourceMappingURL=sample-reception.service.js.map