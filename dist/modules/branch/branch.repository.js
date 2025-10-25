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
exports.BranchRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const branch_entity_1 = require("./entities/branch.entity");
let BranchRepository = class BranchRepository {
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async findById(id) {
        return this.branchRepository.findOne({
            where: { id, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
        });
    }
    async findByCode(branchCode) {
        return this.branchRepository.findOne({
            where: { branchCode, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
        });
    }
    async save(branch) {
        return this.branchRepository.save(branch);
    }
    async delete(id) {
        await this.branchRepository.delete(id);
    }
    async softDelete(id) {
        await this.branchRepository.update(id, {
            deletedAt: new Date(),
        });
    }
    async findAll() {
        return this.branchRepository.find({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findActive() {
        return this.branchRepository.find({
            where: { isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findInactive() {
        return this.branchRepository.find({
            where: { isActive: false, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findByProvinceId(provinceId) {
        return this.branchRepository.find({
            where: { provinceId, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findActiveByProvinceId(provinceId) {
        return this.branchRepository.find({
            where: { provinceId, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findByProvinceCode(provinceCode) {
        return this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL')
            .andWhere('province.provinceCode = :provinceCode', { provinceCode })
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
    async findActiveByProvinceCode(provinceCode) {
        return this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL')
            .andWhere('branch.isActive = :isActive', { isActive: true })
            .andWhere('province.provinceCode = :provinceCode', { provinceCode })
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
    async findByWardId(wardId) {
        return this.branchRepository.find({
            where: { wardId, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findActiveByWardId(wardId) {
        return this.branchRepository.find({
            where: { wardId, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findByWardCode(wardCode) {
        return this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL')
            .andWhere('ward.wardCode = :wardCode', { wardCode })
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
    async findActiveByWardCode(wardCode) {
        return this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL')
            .andWhere('branch.isActive = :isActive', { isActive: true })
            .andWhere('ward.wardCode = :wardCode', { wardCode })
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
    async findByProvinceAndWard(provinceId, wardId) {
        return this.branchRepository.find({
            where: { provinceId, wardId, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findActiveByProvinceAndWard(provinceId, wardId) {
        return this.branchRepository.find({
            where: { provinceId, wardId, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByName(name) {
        return this.branchRepository.find({
            where: {
                branchName: (0, typeorm_1.Like)(`%${name}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByCode(code) {
        return this.branchRepository.find({
            where: {
                branchCode: (0, typeorm_1.Like)(`%${code}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByShortName(shortName) {
        return this.branchRepository.find({
            where: {
                shortName: (0, typeorm_1.Like)(`%${shortName}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByAddress(address) {
        return this.branchRepository.find({
            where: {
                address: (0, typeorm_1.Like)(`%${address}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByPhoneNumber(phoneNumber) {
        return this.branchRepository.find({
            where: {
                phoneNumber: (0, typeorm_1.Like)(`%${phoneNumber}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByRepresentative(representative) {
        return this.branchRepository.find({
            where: {
                representative: (0, typeorm_1.Like)(`%${representative}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByBhyCode(bhyCode) {
        return this.branchRepository.find({
            where: {
                bhyCode: (0, typeorm_1.Like)(`%${bhyCode}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByHospitalLevel(hospitalLevel) {
        return this.branchRepository.find({
            where: {
                hospitalLevel: (0, typeorm_1.Like)(`%${hospitalLevel}%`),
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async searchByKeyword(keyword) {
        return this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL')
            .andWhere('(branch.branchName LIKE :keyword OR branch.branchCode LIKE :keyword OR branch.shortName LIKE :keyword OR branch.address LIKE :keyword OR branch.phoneNumber LIKE :keyword OR branch.representative LIKE :keyword OR branch.bhyCode LIKE :keyword)', { keyword: `%${keyword}%` })
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
    async searchByProvinceAndKeyword(provinceId, keyword) {
        return this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL')
            .andWhere('branch.provinceId = :provinceId', { provinceId })
            .andWhere('(branch.branchName LIKE :keyword OR branch.branchCode LIKE :keyword OR branch.shortName LIKE :keyword OR branch.address LIKE :keyword OR branch.phoneNumber LIKE :keyword OR branch.representative LIKE :keyword OR branch.bhyCode LIKE :keyword)', { keyword: `%${keyword}%` })
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
    async searchByWardAndKeyword(wardId, keyword) {
        return this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL')
            .andWhere('branch.wardId = :wardId', { wardId })
            .andWhere('(branch.branchName LIKE :keyword OR branch.branchCode LIKE :keyword OR branch.shortName LIKE :keyword OR branch.address LIKE :keyword OR branch.phoneNumber LIKE :keyword OR branch.representative LIKE :keyword OR branch.bhyCode LIKE :keyword)', { keyword: `%${keyword}%` })
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
    async findWithPagination(limit, offset, sortBy = 'branchName', sortOrder = 'ASC', filters) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.province', 'province')
            .leftJoinAndSelect('branch.ward', 'ward')
            .where('branch.deletedAt IS NULL');
        if (filters?.isActive !== undefined) {
            queryBuilder.andWhere('branch.isActive = :isActive', { isActive: filters.isActive });
        }
        if (filters?.provinceId) {
            queryBuilder.andWhere('branch.provinceId = :provinceId', { provinceId: filters.provinceId });
        }
        if (filters?.wardId) {
            queryBuilder.andWhere('branch.wardId = :wardId', { wardId: filters.wardId });
        }
        if (filters?.hospitalLevel) {
            queryBuilder.andWhere('branch.hospitalLevel = :hospitalLevel', { hospitalLevel: filters.hospitalLevel });
        }
        if (filters?.search) {
            queryBuilder.andWhere('(branch.branchName LIKE :search OR branch.branchCode LIKE :search OR branch.shortName LIKE :search OR branch.address LIKE :search OR branch.phoneNumber LIKE :search OR branch.representative LIKE :search OR branch.bhyCode LIKE :search)', { search: `%${filters.search}%` });
        }
        const validSortFields = ['branchName', 'branchCode', 'hospitalLevel', 'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'branchName';
        queryBuilder.orderBy(`branch.${sortField}`, sortOrder);
        queryBuilder.take(limit).skip(offset);
        return queryBuilder.getManyAndCount();
    }
    async findByIds(ids) {
        return this.branchRepository.find({
            where: { id: (0, typeorm_1.In)(ids), deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findByProvinceIds(provinceIds) {
        return this.branchRepository.find({
            where: { provinceId: (0, typeorm_1.In)(provinceIds), deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async findByWardIds(wardIds) {
        return this.branchRepository.find({
            where: { wardId: (0, typeorm_1.In)(wardIds), deletedAt: (0, typeorm_1.IsNull)() },
            relations: ['province', 'ward'],
            order: { branchName: 'ASC' },
        });
    }
    async saveMany(branches) {
        return this.branchRepository.save(branches);
    }
    async deleteMany(ids) {
        await this.branchRepository.update({ id: (0, typeorm_1.In)(ids) }, { deletedAt: new Date() });
    }
    async countTotal() {
        return this.branchRepository.count({
            where: { deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countActive() {
        return this.branchRepository.count({
            where: { isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countInactive() {
        return this.branchRepository.count({
            where: { isActive: false, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countByStatus(isActive) {
        return this.branchRepository.count({
            where: { isActive, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countByProvince(provinceId) {
        return this.branchRepository.count({
            where: { provinceId, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countActiveByProvince(provinceId) {
        return this.branchRepository.count({
            where: { provinceId, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countByWard(wardId) {
        return this.branchRepository.count({
            where: { wardId, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countActiveByWard(wardId) {
        return this.branchRepository.count({
            where: { wardId, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countByHospitalLevel(hospitalLevel) {
        return this.branchRepository.count({
            where: { hospitalLevel, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async countActiveByHospitalLevel(hospitalLevel) {
        return this.branchRepository.count({
            where: { hospitalLevel, isActive: true, deletedAt: (0, typeorm_1.IsNull)() },
        });
    }
    async existsByCode(branchCode, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.branchCode = :branchCode', { branchCode })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByName(branchName, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.branchName = :branchName', { branchName })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByShortName(shortName, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.shortName = :shortName', { shortName })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByBhyCode(bhyCode, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.bhyCode = :bhyCode', { bhyCode })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByPhoneNumber(phoneNumber, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.phoneNumber = :phoneNumber', { phoneNumber })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByNameInProvince(branchName, provinceId, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.branchName = :branchName', { branchName })
            .andWhere('branch.provinceId = :provinceId', { provinceId })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByShortNameInProvince(shortName, provinceId, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.shortName = :shortName', { shortName })
            .andWhere('branch.provinceId = :provinceId', { provinceId })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByNameInWard(branchName, wardId, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.branchName = :branchName', { branchName })
            .andWhere('branch.wardId = :wardId', { wardId })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async existsByShortNameInWard(shortName, wardId, excludeId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.shortName = :shortName', { shortName })
            .andWhere('branch.wardId = :wardId', { wardId })
            .andWhere('branch.deletedAt IS NULL');
        if (excludeId) {
            queryBuilder.andWhere('branch.id != :excludeId', { excludeId });
        }
        const count = await queryBuilder.getCount();
        return count > 0;
    }
    async getNextBranchCode(provinceCode) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .leftJoin('branch.province', 'province')
            .where('branch.deletedAt IS NULL')
            .andWhere('province.provinceCode = :provinceCode', { provinceCode })
            .orderBy('branch.branchCode', 'DESC')
            .limit(1);
        const lastBranch = await queryBuilder.getOne();
        if (!lastBranch) {
            return `${provinceCode}001`;
        }
        const lastCode = lastBranch.branchCode;
        const lastNumber = parseInt(lastCode.substring(provinceCode.length));
        const nextNumber = lastNumber + 1;
        return `${provinceCode}${nextNumber.toString().padStart(3, '0')}`;
    }
    async getMaxBranchCode(provinceCode) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .leftJoin('branch.province', 'province')
            .where('branch.deletedAt IS NULL')
            .andWhere('province.provinceCode = :provinceCode', { provinceCode })
            .orderBy('branch.branchCode', 'DESC')
            .limit(1);
        const lastBranch = await queryBuilder.getOne();
        return lastBranch?.branchCode || `${provinceCode}000`;
    }
    async reorderBranches(provinceId, wardId) {
        const queryBuilder = this.branchRepository
            .createQueryBuilder('branch')
            .where('branch.deletedAt IS NULL');
        if (provinceId) {
            queryBuilder.andWhere('branch.provinceId = :provinceId', { provinceId });
        }
        if (wardId) {
            queryBuilder.andWhere('branch.wardId = :wardId', { wardId });
        }
        const branches = await queryBuilder
            .orderBy('branch.branchName', 'ASC')
            .getMany();
    }
};
exports.BranchRepository = BranchRepository;
exports.BranchRepository = BranchRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(branch_entity_1.Branch)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BranchRepository);
//# sourceMappingURL=branch.repository.js.map