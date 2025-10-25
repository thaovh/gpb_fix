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
exports.BranchService = void 0;
const common_1 = require("@nestjs/common");
const branch_entity_1 = require("./entities/branch.entity");
const create_branch_dto_1 = require("./dto/commands/create-branch.dto");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let BranchService = class BranchService extends base_service_1.BaseService {
    constructor(branchRepository, dataSource, currentUserContext) {
        super(dataSource, currentUserContext);
        this.branchRepository = branchRepository;
    }
    async createBranch(createBranchDto, createdBy) {
        try {
            await this.validateProvinceAndWard(createBranchDto.provinceId, createBranchDto.wardId);
            if (!createBranchDto.branchCode) {
                createBranchDto.branchCode = await this.generateBranchCode(createBranchDto.provinceId);
            }
            const existingBranch = await this.branchRepository.findByCode(createBranchDto.branchCode);
            if (existingBranch) {
                throw new common_1.ConflictException(`Chi nhánh với mã '${createBranchDto.branchCode}' đã tồn tại`);
            }
            const existingNameInProvince = await this.branchRepository.existsByNameInProvince(createBranchDto.branchName, createBranchDto.provinceId);
            if (existingNameInProvince) {
                throw new common_1.ConflictException(`Chi nhánh với tên '${createBranchDto.branchName}' đã tồn tại trong tỉnh này`);
            }
            const existingBhyCode = await this.branchRepository.existsByBhyCode(createBranchDto.bhyCode);
            if (existingBhyCode) {
                throw new common_1.ConflictException(`Chi nhánh với mã BHYT '${createBranchDto.bhyCode}' đã tồn tại`);
            }
            const existingPhone = await this.branchRepository.existsByPhoneNumber(createBranchDto.phoneNumber);
            if (existingPhone) {
                throw new common_1.ConflictException(`Chi nhánh với số điện thoại '${createBranchDto.phoneNumber}' đã tồn tại`);
            }
            const branch = new branch_entity_1.Branch();
            branch.branchCode = createBranchDto.branchCode;
            branch.branchName = createBranchDto.branchName;
            branch.shortName = createBranchDto.shortName;
            branch.provinceId = createBranchDto.provinceId;
            branch.wardId = createBranchDto.wardId;
            branch.address = createBranchDto.address;
            branch.phoneNumber = createBranchDto.phoneNumber;
            branch.hospitalLevel = createBranchDto.hospitalLevel;
            branch.representative = createBranchDto.representative;
            branch.bhyCode = createBranchDto.bhyCode;
            branch.isActive = createBranchDto.isActive ?? true;
            branch.createdBy = createdBy;
            branch.updatedBy = createdBy;
            const savedBranch = await this.branchRepository.save(branch);
            return this.mapBranchToResponseDto(savedBranch);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Lỗi khi tạo chi nhánh mới');
        }
    }
    async updateBranch(id, updateBranchDto, updatedBy) {
        try {
            const branch = await this.branchRepository.findById(id);
            if (!branch) {
                throw new common_1.NotFoundException(`Chi nhánh với ID '${id}' không tồn tại`);
            }
            if (updateBranchDto.provinceId) {
                await this.validateProvinceAndWard(updateBranchDto.provinceId, updateBranchDto.wardId || branch.wardId);
            }
            if (updateBranchDto.branchCode && updateBranchDto.branchCode !== branch.branchCode) {
                const existingBranch = await this.branchRepository.findByCode(updateBranchDto.branchCode);
                if (existingBranch) {
                    throw new common_1.ConflictException(`Chi nhánh với mã '${updateBranchDto.branchCode}' đã tồn tại`);
                }
            }
            if (updateBranchDto.branchName && updateBranchDto.branchName !== branch.branchName) {
                const provinceId = updateBranchDto.provinceId || branch.provinceId;
                const existingNameInProvince = await this.branchRepository.existsByNameInProvince(updateBranchDto.branchName, provinceId, id);
                if (existingNameInProvince) {
                    throw new common_1.ConflictException(`Chi nhánh với tên '${updateBranchDto.branchName}' đã tồn tại trong tỉnh này`);
                }
            }
            if (updateBranchDto.bhyCode && updateBranchDto.bhyCode !== branch.bhyCode) {
                const existingBhyCode = await this.branchRepository.existsByBhyCode(updateBranchDto.bhyCode, id);
                if (existingBhyCode) {
                    throw new common_1.ConflictException(`Chi nhánh với mã BHYT '${updateBranchDto.bhyCode}' đã tồn tại`);
                }
            }
            if (updateBranchDto.phoneNumber && updateBranchDto.phoneNumber !== branch.phoneNumber) {
                const existingPhone = await this.branchRepository.existsByPhoneNumber(updateBranchDto.phoneNumber, id);
                if (existingPhone) {
                    throw new common_1.ConflictException(`Chi nhánh với số điện thoại '${updateBranchDto.phoneNumber}' đã tồn tại`);
                }
            }
            if (updateBranchDto.branchCode !== undefined)
                branch.branchCode = updateBranchDto.branchCode;
            if (updateBranchDto.branchName !== undefined)
                branch.branchName = updateBranchDto.branchName;
            if (updateBranchDto.shortName !== undefined)
                branch.shortName = updateBranchDto.shortName;
            if (updateBranchDto.provinceId !== undefined)
                branch.provinceId = updateBranchDto.provinceId;
            if (updateBranchDto.wardId !== undefined)
                branch.wardId = updateBranchDto.wardId;
            if (updateBranchDto.address !== undefined)
                branch.address = updateBranchDto.address;
            if (updateBranchDto.phoneNumber !== undefined)
                branch.phoneNumber = updateBranchDto.phoneNumber;
            if (updateBranchDto.hospitalLevel !== undefined)
                branch.hospitalLevel = updateBranchDto.hospitalLevel;
            if (updateBranchDto.representative !== undefined)
                branch.representative = updateBranchDto.representative;
            if (updateBranchDto.bhyCode !== undefined)
                branch.bhyCode = updateBranchDto.bhyCode;
            if (updateBranchDto.isActive !== undefined)
                branch.isActive = updateBranchDto.isActive;
            branch.updatedBy = updatedBy;
            const updatedBranch = await this.branchRepository.save(branch);
            return this.mapBranchToResponseDto(updatedBranch);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Lỗi khi cập nhật chi nhánh');
        }
    }
    async deleteBranch(id, deletedBy) {
        try {
            const branch = await this.branchRepository.findById(id);
            if (!branch) {
                throw new common_1.NotFoundException(`Chi nhánh với ID '${id}' không tồn tại`);
            }
            await this.branchRepository.softDelete(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Lỗi khi xóa chi nhánh');
        }
    }
    async hardDeleteBranch(id) {
        try {
            const branch = await this.branchRepository.findById(id);
            if (!branch) {
                throw new common_1.NotFoundException(`Chi nhánh với ID '${id}' không tồn tại`);
            }
            await this.branchRepository.delete(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Lỗi khi xóa cứng chi nhánh');
        }
    }
    async getBranches(getBranchesDto) {
        try {
            const { limit = 10, offset = 0, sortBy, sortOrder, isActive, search, provinceId, wardId, hospitalLevel } = getBranchesDto;
            const [branches, total] = await this.branchRepository.findWithPagination(limit, offset, sortBy, sortOrder, {
                isActive,
                search,
                provinceId,
                wardId,
                hospitalLevel,
            });
            const branchResponses = branches.map(branch => this.mapBranchToResponseDto(branch));
            return {
                branches: branchResponses,
                pagination: {
                    total,
                    limit,
                    offset,
                    page: Math.floor(offset / limit) + 1,
                    totalPages: Math.ceil(total / limit),
                    hasNext: offset + limit < total,
                    hasPrev: offset > 0,
                },
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi lấy danh sách chi nhánh');
        }
    }
    async getBranchById(id) {
        try {
            const branch = await this.branchRepository.findById(id);
            if (!branch) {
                throw new common_1.NotFoundException(`Chi nhánh với ID '${id}' không tồn tại`);
            }
            return this.mapBranchToResponseDto(branch);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Lỗi khi lấy thông tin chi nhánh');
        }
    }
    async searchBranches(searchBranchesDto) {
        try {
            const { keyword, searchType, provinceId, wardId, hospitalLevel, limit = 10, offset = 0, sortBy, sortOrder } = searchBranchesDto;
            let branches = [];
            switch (searchType) {
                case 'name':
                    branches = await this.branchRepository.searchByName(keyword);
                    break;
                case 'code':
                    branches = await this.branchRepository.searchByCode(keyword);
                    break;
                case 'shortName':
                    branches = await this.branchRepository.searchByShortName(keyword);
                    break;
                case 'address':
                    branches = await this.branchRepository.searchByAddress(keyword);
                    break;
                case 'phone':
                    branches = await this.branchRepository.searchByPhoneNumber(keyword);
                    break;
                case 'representative':
                    branches = await this.branchRepository.searchByRepresentative(keyword);
                    break;
                case 'bhy':
                    branches = await this.branchRepository.searchByBhyCode(keyword);
                    break;
                case 'hospitalLevel':
                    branches = await this.branchRepository.searchByHospitalLevel(keyword);
                    break;
                case 'all':
                default:
                    if (provinceId) {
                        branches = await this.branchRepository.searchByProvinceAndKeyword(provinceId, keyword);
                    }
                    else if (wardId) {
                        branches = await this.branchRepository.searchByWardAndKeyword(wardId, keyword);
                    }
                    else {
                        branches = await this.branchRepository.searchByKeyword(keyword);
                    }
                    break;
            }
            if (hospitalLevel) {
                branches = branches.filter(branch => branch.hospitalLevel === hospitalLevel);
            }
            const total = branches.length;
            const paginatedBranches = branches.slice(offset, offset + limit);
            const branchResponses = paginatedBranches.map(branch => this.mapBranchToResponseDto(branch));
            return {
                branches: branchResponses,
                pagination: {
                    total,
                    limit,
                    offset,
                    page: Math.floor(offset / limit) + 1,
                    totalPages: Math.ceil(total / limit),
                    hasNext: offset + limit < total,
                    hasPrev: offset > 0,
                },
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi tìm kiếm chi nhánh');
        }
    }
    async getBranchesByProvince(getBranchesByProvinceDto) {
        try {
            const { provinceId, limit = 10, offset = 0, sortBy, sortOrder, isActive, hospitalLevel, search } = getBranchesByProvinceDto;
            const [branches, total] = await this.branchRepository.findWithPagination(limit, offset, sortBy, sortOrder, {
                isActive,
                search,
                provinceId,
                hospitalLevel,
            });
            const branchResponses = branches.map(branch => this.mapBranchToResponseDto(branch));
            return {
                branches: branchResponses,
                pagination: {
                    total,
                    limit,
                    offset,
                    page: Math.floor(offset / limit) + 1,
                    totalPages: Math.ceil(total / limit),
                    hasNext: offset + limit < total,
                    hasPrev: offset > 0,
                },
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi lấy chi nhánh theo tỉnh');
        }
    }
    async getBranchesByWard(getBranchesByWardDto) {
        try {
            const { wardId, limit = 10, offset = 0, sortBy, sortOrder, isActive, hospitalLevel, search } = getBranchesByWardDto;
            const [branches, total] = await this.branchRepository.findWithPagination(limit, offset, sortBy, sortOrder, {
                isActive,
                search,
                wardId,
                hospitalLevel,
            });
            const branchResponses = branches.map(branch => this.mapBranchToResponseDto(branch));
            return {
                branches: branchResponses,
                pagination: {
                    total,
                    limit,
                    offset,
                    page: Math.floor(offset / limit) + 1,
                    totalPages: Math.ceil(total / limit),
                    hasNext: offset + limit < total,
                    hasPrev: offset > 0,
                },
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi lấy chi nhánh theo xã');
        }
    }
    async getBranchStats() {
        try {
            const totalBranches = await this.branchRepository.countTotal();
            const activeBranches = await this.branchRepository.countActive();
            const inactiveBranches = await this.branchRepository.countInactive();
            const branchesByLevel = {};
            for (const level of Object.values(create_branch_dto_1.HospitalLevel)) {
                branchesByLevel[level] = await this.branchRepository.countByHospitalLevel(level);
            }
            return {
                totalBranches,
                activeBranches,
                inactiveBranches,
                softDeletedBranches: totalBranches - activeBranches - inactiveBranches,
                branchesByLevel,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Lỗi khi lấy thống kê chi nhánh');
        }
    }
    async validateProvinceAndWard(provinceId, wardId) {
    }
    async generateBranchCode(provinceId) {
        return `BR${Date.now().toString().slice(-3)}`;
    }
    mapBranchToResponseDto(branch) {
        return {
            id: branch.id,
            branchCode: branch.branchCode,
            branchName: branch.branchName,
            shortName: branch.shortName,
            provinceId: branch.provinceId,
            wardId: branch.wardId,
            address: branch.address,
            phoneNumber: branch.phoneNumber,
            hospitalLevel: branch.hospitalLevel,
            representative: branch.representative,
            bhyCode: branch.bhyCode,
            isActive: branch.isActive,
            createdAt: branch.createdAt,
            updatedAt: branch.updatedAt,
            createdBy: branch.createdBy,
            updatedBy: branch.updatedBy,
            version: branch.version,
            displayName: branch.getDisplayName(),
            fullAddress: branch.getFullAddress(),
            province: branch.province ? {
                id: branch.province.id,
                provinceCode: branch.province.provinceCode,
                provinceName: branch.province.provinceName,
                shortName: branch.province.shortName,
            } : undefined,
            ward: branch.ward ? {
                id: branch.ward.id,
                wardCode: branch.ward.wardCode,
                wardName: branch.ward.wardName,
                shortName: branch.ward.shortName,
            } : undefined,
        };
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IBranchRepository')),
    __metadata("design:paramtypes", [Object, Object, current_user_context_service_1.CurrentUserContextService])
], BranchService);
//# sourceMappingURL=branch.service.js.map