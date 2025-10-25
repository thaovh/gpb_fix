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
exports.WardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const ward_entity_1 = require("./entities/ward.entity");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let WardService = class WardService extends base_service_1.BaseService {
    constructor(wardRepository, provinceRepository, dataSource, currentUserContext) {
        super(dataSource, currentUserContext);
        this.wardRepository = wardRepository;
        this.provinceRepository = provinceRepository;
    }
    async createWard(createWardDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const province = await this.provinceRepository.findById(createWardDto.provinceId);
            if (!province) {
                throw new common_1.NotFoundException(`Tỉnh với ID '${createWardDto.provinceId}' không tồn tại`);
            }
            const existingByCode = await this.wardRepository.existsByCode(createWardDto.wardCode);
            if (existingByCode) {
                throw new common_1.ConflictException(`Mã xã '${createWardDto.wardCode}' đã tồn tại`);
            }
            const existingByNameInProvince = await this.wardRepository.existsByNameInProvince(createWardDto.wardName, createWardDto.provinceId);
            if (existingByNameInProvince) {
                throw new common_1.ConflictException(`Tên xã '${createWardDto.wardName}' đã tồn tại trong tỉnh '${province.provinceName}'`);
            }
            const existingByShortNameInProvince = await this.wardRepository.existsByShortNameInProvince(createWardDto.shortName, createWardDto.provinceId);
            if (existingByShortNameInProvince) {
                throw new common_1.ConflictException(`Tên viết tắt '${createWardDto.shortName}' đã tồn tại trong tỉnh '${province.provinceName}'`);
            }
            const ward = new ward_entity_1.Ward();
            ward.wardCode = createWardDto.wardCode;
            ward.wardName = createWardDto.wardName;
            ward.provinceId = createWardDto.provinceId;
            ward.shortName = createWardDto.shortName;
            ward.sortOrder = createWardDto.sortOrder;
            ward.isActive = createWardDto.isActive ?? true;
            this.setAuditFields(ward, false);
            const savedWard = await manager.save(ward_entity_1.Ward, ward);
            return savedWard.id;
        });
    }
    async updateWard(id, updateWardDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const ward = await this.wardRepository.findById(id);
            if (!ward) {
                throw new common_1.NotFoundException('Không tìm thấy xã');
            }
            if (updateWardDto.provinceId && updateWardDto.provinceId !== ward.provinceId) {
                const province = await this.provinceRepository.findById(updateWardDto.provinceId);
                if (!province) {
                    throw new common_1.NotFoundException(`Tỉnh với ID '${updateWardDto.provinceId}' không tồn tại`);
                }
            }
            if (updateWardDto.wardCode && updateWardDto.wardCode !== ward.wardCode) {
                const existingByCode = await this.wardRepository.existsByCode(updateWardDto.wardCode, id);
                if (existingByCode) {
                    throw new common_1.ConflictException(`Mã xã '${updateWardDto.wardCode}' đã tồn tại`);
                }
            }
            if (updateWardDto.wardName && updateWardDto.wardName !== ward.wardName) {
                const targetProvinceId = updateWardDto.provinceId || ward.provinceId;
                const existingByNameInProvince = await this.wardRepository.existsByNameInProvince(updateWardDto.wardName, targetProvinceId, id);
                if (existingByNameInProvince) {
                    throw new common_1.ConflictException(`Tên xã '${updateWardDto.wardName}' đã tồn tại trong tỉnh`);
                }
            }
            if (updateWardDto.shortName && updateWardDto.shortName !== ward.shortName) {
                const targetProvinceId = updateWardDto.provinceId || ward.provinceId;
                const existingByShortNameInProvince = await this.wardRepository.existsByShortNameInProvince(updateWardDto.shortName, targetProvinceId, id);
                if (existingByShortNameInProvince) {
                    throw new common_1.ConflictException(`Tên viết tắt '${updateWardDto.shortName}' đã tồn tại trong tỉnh`);
                }
            }
            if (updateWardDto.wardCode !== undefined) {
                ward.wardCode = updateWardDto.wardCode;
            }
            if (updateWardDto.wardName !== undefined) {
                ward.wardName = updateWardDto.wardName;
            }
            if (updateWardDto.provinceId !== undefined) {
                ward.provinceId = updateWardDto.provinceId;
            }
            if (updateWardDto.shortName !== undefined) {
                ward.shortName = updateWardDto.shortName;
            }
            if (updateWardDto.sortOrder !== undefined) {
                ward.sortOrder = updateWardDto.sortOrder;
            }
            if (updateWardDto.isActive !== undefined) {
                ward.isActive = updateWardDto.isActive;
            }
            this.setAuditFields(ward, true);
            await manager.save(ward_entity_1.Ward, ward);
        });
    }
    async deleteWard(deleteWardDto, currentUser) {
        return this.dataSource.transaction(async (manager) => {
            const ward = await this.wardRepository.findById(deleteWardDto.id);
            if (!ward) {
                throw new common_1.NotFoundException('Không tìm thấy xã');
            }
            if (deleteWardDto.hardDelete) {
                await this.wardRepository.delete(deleteWardDto.id);
            }
            else {
                await this.wardRepository.softDelete(deleteWardDto.id);
            }
        });
    }
    async getWardById(getWardByIdDto) {
        const ward = await this.wardRepository.findById(getWardByIdDto.id);
        if (!ward) {
            throw new common_1.NotFoundException('Không tìm thấy xã');
        }
        return this.mapWardToResponseDto(ward);
    }
    async getWards(getWardsDto) {
        const { limit = 10, offset = 0, sortBy, sortOrder, isActive, provinceId, search } = getWardsDto;
        const [wards, total] = await this.wardRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search, provinceId });
        const totalPages = Math.ceil(total / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        const pagination = {
            total,
            limit,
            offset,
            hasNext: offset + limit < total,
            hasPrev: offset > 0,
            totalPages,
            currentPage,
        };
        const [totalCount, activeCount, inactiveCount] = await Promise.all([
            this.wardRepository.countTotal(),
            this.wardRepository.countActive(),
            this.wardRepository.countInactive(),
        ]);
        return {
            wards: wards.map(ward => this.mapWardToResponseDto(ward)),
            pagination,
            statistics: {
                total: totalCount,
                active: activeCount,
                inactive: inactiveCount,
            },
        };
    }
    async searchWards(searchWardsDto) {
        const { keyword, searchType = 'all', provinceId, limit = 10, offset = 0, sortBy, sortOrder } = searchWardsDto;
        let wards = [];
        if (provinceId) {
            wards = await this.wardRepository.searchByProvinceAndKeyword(provinceId, keyword);
        }
        else {
            switch (searchType) {
                case 'name':
                    wards = await this.wardRepository.searchByName(keyword);
                    break;
                case 'code':
                    wards = await this.wardRepository.searchByCode(keyword);
                    break;
                case 'shortName':
                    wards = await this.wardRepository.searchByShortName(keyword);
                    break;
                case 'all':
                default:
                    wards = await this.wardRepository.searchByKeyword(keyword);
                    break;
            }
        }
        const total = wards.length;
        const paginatedWards = wards.slice(offset, offset + limit);
        const totalPages = Math.ceil(total / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        const pagination = {
            total,
            limit,
            offset,
            hasNext: offset + limit < total,
            hasPrev: offset > 0,
            totalPages,
            currentPage,
        };
        const [totalCount, activeCount, inactiveCount] = await Promise.all([
            this.wardRepository.countTotal(),
            this.wardRepository.countActive(),
            this.wardRepository.countInactive(),
        ]);
        return {
            wards: paginatedWards.map(ward => this.mapWardToResponseDto(ward)),
            pagination,
            statistics: {
                total: totalCount,
                active: activeCount,
                inactive: inactiveCount,
            },
        };
    }
    async getWardsByProvince(getWardsByProvinceDto) {
        const { provinceId, limit = 10, offset = 0, sortBy, sortOrder, isActive, search } = getWardsByProvinceDto;
        const province = await this.provinceRepository.findById(provinceId);
        if (!province) {
            throw new common_1.NotFoundException(`Tỉnh với ID '${provinceId}' không tồn tại`);
        }
        const [wards, total] = await this.wardRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search, provinceId });
        const totalPages = Math.ceil(total / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        const pagination = {
            total,
            limit,
            offset,
            hasNext: offset + limit < total,
            hasPrev: offset > 0,
            totalPages,
            currentPage,
        };
        const [totalCount, activeCount] = await Promise.all([
            this.wardRepository.countByProvince(provinceId),
            this.wardRepository.countActiveByProvince(provinceId),
        ]);
        const inactiveCount = totalCount - activeCount;
        return {
            wards: wards.map(ward => this.mapWardToResponseDto(ward)),
            pagination,
            statistics: {
                total: totalCount,
                active: activeCount,
                inactive: inactiveCount,
                byProvince: {
                    [provinceId]: totalCount,
                },
            },
        };
    }
    async getWardsStats() {
        const [total, active, inactive] = await Promise.all([
            this.wardRepository.countTotal(),
            this.wardRepository.countActive(),
            this.wardRepository.countInactive(),
        ]);
        return { total, active, inactive };
    }
    async getWardsStatsByProvince(provinceId) {
        const [total, active] = await Promise.all([
            this.wardRepository.countByProvince(provinceId),
            this.wardRepository.countActiveByProvince(provinceId),
        ]);
        return { total, active, inactive: total - active };
    }
    async reorderWards(provinceId) {
        await this.wardRepository.reorderSortOrder(provinceId);
    }
    mapWardToResponseDto(ward) {
        return {
            id: ward.id,
            wardCode: ward.wardCode,
            wardName: ward.wardName,
            provinceId: ward.provinceId,
            shortName: ward.shortName,
            sortOrder: ward.sortOrder,
            isActive: ward.isActive,
            createdAt: ward.createdAt,
            updatedAt: ward.updatedAt,
            createdBy: ward.createdBy,
            updatedBy: ward.updatedBy,
            version: ward.version,
            displayName: ward.getDisplayName(),
            province: ward.province ? {
                id: ward.province.id,
                provinceCode: ward.province.provinceCode,
                provinceName: ward.province.provinceName,
                shortName: ward.province.shortName,
            } : undefined,
        };
    }
};
exports.WardService = WardService;
exports.WardService = WardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IWardRepository')),
    __param(1, (0, common_1.Inject)('IProvinceRepository')),
    __metadata("design:paramtypes", [Object, Object, typeorm_1.DataSource,
        current_user_context_service_1.CurrentUserContextService])
], WardService);
//# sourceMappingURL=ward.service.js.map