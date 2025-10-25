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
exports.ProvinceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const province_entity_1 = require("./entities/province.entity");
const dataloader_service_1 = require("../../shared/dataloaders/dataloader.service");
const app_error_1 = require("../../common/errors/app.error");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let ProvinceService = class ProvinceService extends base_service_1.BaseService {
    constructor(provinceRepository, dataSource, dataLoaderService, currentUserContext) {
        super(dataSource, currentUserContext);
        this.provinceRepository = provinceRepository;
        this.dataSource = dataSource;
        this.dataLoaderService = dataLoaderService;
        this.currentUserContext = currentUserContext;
    }
    async createProvince(createProvinceDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const existingProvince = await this.provinceRepository.findByCode(createProvinceDto.provinceCode);
            if (existingProvince) {
                throw app_error_1.AppError.conflict('Province with this code already exists');
            }
            const province = new province_entity_1.Province();
            province.provinceCode = createProvinceDto.provinceCode;
            province.provinceName = createProvinceDto.provinceName;
            province.shortName = createProvinceDto.shortName;
            province.sortOrder = createProvinceDto.sortOrder || await this.getNextSortOrder();
            province.createdBy = currentUser.id;
            province.updatedBy = currentUser.id;
            const savedProvince = await manager.save(province_entity_1.Province, province);
            return savedProvince.id;
        });
    }
    async updateProvince(id, updateProvinceDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const province = await this.provinceRepository.findById(id);
            if (!province) {
                throw app_error_1.AppError.notFound('Province not found');
            }
            Object.assign(province, updateProvinceDto);
            this.setAuditFields(province, true);
            await manager.save(province_entity_1.Province, province);
        });
    }
    async deleteProvince(id) {
        return this.dataSource.transaction(async (manager) => {
            const province = await this.provinceRepository.findById(id);
            if (!province) {
                throw app_error_1.AppError.notFound('Province not found');
            }
            await this.provinceRepository.delete(id);
        });
    }
    async getProvinceById(id) {
        const province = await this.provinceRepository.findById(id);
        if (!province) {
            throw app_error_1.AppError.notFound('Province not found');
        }
        return this.mapProvinceToResponseDto(province);
    }
    async getProvinces(query) {
        const { limit = 10, offset = 0, search, isActive, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [provinces, total] = await this.provinceRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search });
        return {
            provinces: provinces.map(province => this.mapProvinceToResponseDto(province)),
            total,
            limit,
            offset,
        };
    }
    async getProvincesWithWards(query) {
        const { limit = 10, offset = 0, search, isActive, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [provinces, total] = await this.provinceRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search });
        const loaders = this.dataLoaderService.createLoaders();
        const provincesWithWards = await Promise.all(provinces.map(async (province) => {
            const wards = await loaders.wardsByProvinceLoader.load(province.id);
            return {
                ...this.mapProvinceToResponseDto(province),
                wards: wards.map(ward => ({
                    id: ward.id,
                    wardCode: ward.wardCode,
                    wardName: ward.wardName,
                    shortName: ward.shortName,
                    sortOrder: ward.sortOrder,
                    isActive: ward.isActive,
                })),
            };
        }));
        return {
            provinces: provincesWithWards,
            total,
            limit,
            offset,
        };
    }
    async getProvincesWithBranches(query) {
        const { limit = 10, offset = 0, search, isActive, sortBy = 'sortOrder', sortOrder = 'ASC' } = query;
        const [provinces, total] = await this.provinceRepository.findWithPagination(limit, offset, sortBy, sortOrder, { isActive, search });
        const loaders = this.dataLoaderService.createLoaders();
        const provincesWithBranches = await Promise.all(provinces.map(async (province) => {
            const branches = await loaders.branchesByProvinceLoader.load(province.id);
            return {
                ...this.mapProvinceToResponseDto(province),
                branches: branches.map(branch => ({
                    id: branch.id,
                    branchCode: branch.branchCode,
                    branchName: branch.branchName,
                    shortName: branch.shortName,
                    hospitalLevel: branch.hospitalLevel,
                    isActive: branch.isActive,
                })),
            };
        }));
        return {
            provinces: provincesWithBranches,
            total,
            limit,
            offset,
        };
    }
    async getStatsOverview() {
        return {
            total: 0,
            active: 0,
            inactive: 0,
        };
    }
    async reorderProvinces(provinceIds) {
        console.log('Reordering provinces:', provinceIds);
    }
    async getNextSortOrder() {
        return this.provinceRepository.getNextSortOrder();
    }
    mapProvinceToResponseDto(province) {
        return {
            id: province.id,
            provinceCode: province.provinceCode,
            provinceName: province.provinceName,
            shortName: province.shortName,
            sortOrder: province.sortOrder,
            isActive: province.isActive,
            version: province.version,
            displayName: province.getDisplayName(),
            createdAt: province.createdAt,
            updatedAt: province.updatedAt,
        };
    }
};
exports.ProvinceService = ProvinceService;
exports.ProvinceService = ProvinceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IProvinceRepository')),
    __param(1, (0, common_1.Inject)(typeorm_1.DataSource)),
    __param(3, (0, common_1.Inject)(current_user_context_service_1.CurrentUserContextService)),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource,
        dataloader_service_1.DataLoaderService,
        current_user_context_service_1.CurrentUserContextService])
], ProvinceService);
//# sourceMappingURL=province.service.js.map