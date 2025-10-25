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
exports.SampleReceptionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sample_reception_entity_1 = require("./entities/sample-reception.entity");
let SampleReceptionRepository = class SampleReceptionRepository {
    constructor(sampleReceptionRepository) {
        this.sampleReceptionRepository = sampleReceptionRepository;
    }
    async findById(id) {
        return this.sampleReceptionRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['sampleType'],
        });
    }
    async findByCode(receptionCode) {
        return this.sampleReceptionRepository.findOne({
            where: { receptionCode, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['sampleType'],
        });
    }
    async existsByCode(receptionCode) {
        return this.sampleReceptionRepository.count({
            where: { receptionCode, deletedAt: (0, typeorm_2.IsNull)() },
        }).then(count => count > 0);
    }
    async save(sampleReception) {
        return this.sampleReceptionRepository.save(sampleReception);
    }
    async delete(id) {
        await this.sampleReceptionRepository.softDelete(id);
    }
    async findWithPagination(limit, offset, search) {
        const queryBuilder = this.sampleReceptionRepository.createQueryBuilder('reception');
        queryBuilder.leftJoinAndSelect('reception.sampleType', 'sampleType');
        queryBuilder.where('reception.deletedAt IS NULL');
        if (search) {
            queryBuilder.andWhere('(reception.receptionCode LIKE :search OR sampleType.typeName LIKE :search)', { search: `%${search}%` });
        }
        queryBuilder.orderBy('reception.receptionDate', 'DESC');
        queryBuilder.addOrderBy('reception.sequenceNumber', 'ASC');
        queryBuilder.take(limit);
        queryBuilder.skip(offset);
        return queryBuilder.getManyAndCount();
    }
    async countByDateAndType(sampleTypeCode, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return this.sampleReceptionRepository
            .createQueryBuilder('reception')
            .leftJoin('reception.sampleType', 'sampleType')
            .where('sampleType.typeCode = :sampleTypeCode', { sampleTypeCode })
            .andWhere('reception.receptionDate BETWEEN :startDate AND :endDate', {
            startDate: startOfDay,
            endDate: endOfDay,
        })
            .andWhere('reception.deletedAt IS NULL')
            .getCount();
    }
    async findTodayReceptions() {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);
        return this.sampleReceptionRepository.find({
            where: {
                receptionDate: (0, typeorm_2.Between)(startOfDay, endOfDay),
                deletedAt: (0, typeorm_2.IsNull)(),
            },
            relations: ['sampleType'],
            order: { sequenceNumber: 'ASC' },
        });
    }
    async findByDateRange(startDate, endDate) {
        return this.sampleReceptionRepository.find({
            where: {
                receptionDate: (0, typeorm_2.Between)(startDate, endDate),
                deletedAt: (0, typeorm_2.IsNull)(),
            },
            relations: ['sampleType'],
            order: { receptionDate: 'DESC', sequenceNumber: 'ASC' },
        });
    }
    async getNextSequenceNumber(sampleTypeId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const result = await this.sampleReceptionRepository
            .createQueryBuilder('sampleReception')
            .select('MAX(sampleReception.sequenceNumber)', 'maxSequence')
            .where('sampleReception.sampleTypeId = :sampleTypeId', { sampleTypeId })
            .andWhere('sampleReception.receptionDate BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
            .andWhere('sampleReception.deletedAt IS NULL')
            .getRawOne();
        return (result?.maxSequence || 0) + 1;
    }
};
exports.SampleReceptionRepository = SampleReceptionRepository;
exports.SampleReceptionRepository = SampleReceptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sample_reception_entity_1.SampleReception)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SampleReceptionRepository);
//# sourceMappingURL=sample-reception.repository.js.map