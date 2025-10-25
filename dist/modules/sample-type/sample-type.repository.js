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
exports.SampleTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sample_type_entity_1 = require("./entities/sample-type.entity");
let SampleTypeRepository = class SampleTypeRepository {
    constructor(sampleTypeRepository) {
        this.sampleTypeRepository = sampleTypeRepository;
    }
    async findById(id) {
        return this.sampleTypeRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async findByCode(typeCode) {
        return this.sampleTypeRepository.findOne({
            where: { typeCode, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async existsByCode(typeCode) {
        const count = await this.sampleTypeRepository.count({
            where: { typeCode, deletedAt: (0, typeorm_2.IsNull)() },
        });
        return count > 0;
    }
    async existsByName(typeName) {
        const count = await this.sampleTypeRepository.count({
            where: { typeName, deletedAt: (0, typeorm_2.IsNull)() },
        });
        return count > 0;
    }
    async save(sampleType) {
        return this.sampleTypeRepository.save(sampleType);
    }
    async delete(id) {
        await this.sampleTypeRepository.softDelete(id);
    }
    async findWithPagination(limit, offset, search) {
        const queryBuilder = this.sampleTypeRepository
            .createQueryBuilder('sampleType')
            .where('sampleType.deletedAt IS NULL')
            .orderBy('sampleType.sortOrder', 'ASC')
            .addOrderBy('sampleType.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);
        if (search) {
            queryBuilder.andWhere('(sampleType.typeCode LIKE :search OR sampleType.typeName LIKE :search OR sampleType.shortName LIKE :search)', { search: `%${search}%` });
        }
        return queryBuilder.getManyAndCount();
    }
    async findActiveWithSorting() {
        return this.sampleTypeRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async getNextSortOrder() {
        const result = await this.sampleTypeRepository
            .createQueryBuilder('sampleType')
            .select('MAX(sampleType.sortOrder)', 'maxOrder')
            .where('sampleType.deletedAt IS NULL')
            .getRawOne();
        return (result?.maxOrder || 0) + 1;
    }
};
exports.SampleTypeRepository = SampleTypeRepository;
exports.SampleTypeRepository = SampleTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sample_type_entity_1.SampleType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SampleTypeRepository);
//# sourceMappingURL=sample-type.repository.js.map