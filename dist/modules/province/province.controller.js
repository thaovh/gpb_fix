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
exports.ProvinceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const province_service_1 = require("./province.service");
const create_province_dto_1 = require("./dto/commands/create-province.dto");
const update_province_dto_1 = require("./dto/commands/update-province.dto");
const get_provinces_dto_1 = require("./dto/queries/get-provinces.dto");
const search_provinces_dto_1 = require("./dto/queries/search-provinces.dto");
const province_response_dto_1 = require("./dto/responses/province-response.dto");
const provinces_list_response_dto_1 = require("./dto/responses/provinces-list-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let ProvinceController = class ProvinceController {
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    async createProvince(createProvinceDto, currentUser) {
        const provinceId = await this.provinceService.createProvince(createProvinceDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ id: provinceId }, 201);
    }
    async updateProvince(id, updateProvinceDto, currentUser) {
        await this.provinceService.updateProvince(id, updateProvinceDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Tỉnh được cập nhật thành công' });
    }
    async deleteProvince(id, hardDelete, req) {
        const currentUser = {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
        };
        const deleteProvinceDto = {
            id,
            hardDelete: hardDelete === 'true',
        };
        await this.provinceService.deleteProvince(deleteProvinceDto.id);
        return response_builder_1.ResponseBuilder.success({ message: 'Tỉnh được xóa thành công' });
    }
    async getProvinces(getProvincesDto) {
        const result = await this.provinceService.getProvinces(getProvincesDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async searchProvinces(searchProvincesDto) {
        const result = await this.provinceService.getProvinces({
            limit: searchProvincesDto.limit,
            offset: searchProvincesDto.offset,
            search: searchProvincesDto.keyword,
            isActive: undefined,
            sortBy: searchProvincesDto.sortBy,
            sortOrder: searchProvincesDto.sortOrder,
        });
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getProvinceById(id, includeDeleted) {
        const getProvinceByIdDto = {
            id,
            includeDeleted: includeDeleted === 'true',
        };
        const result = await this.provinceService.getProvinceById(id);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getProvincesStats() {
        const result = await this.provinceService.getStatsOverview();
        return response_builder_1.ResponseBuilder.success(result);
    }
    async reorderProvinces() {
        await this.provinceService.reorderProvinces([]);
        return response_builder_1.ResponseBuilder.success({ message: 'Thứ tự tỉnh được sắp xếp lại thành công' });
    }
    async getProvincesWithWards(query) {
        const result = await this.provinceService.getProvincesWithWards(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getProvincesWithBranches(query) {
        const result = await this.provinceService.getProvincesWithBranches(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
};
exports.ProvinceController = ProvinceController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tạo tỉnh mới',
        description: 'Tạo một tỉnh thành mới trong hệ thống'
    }),
    (0, swagger_1.ApiBody)({ type: create_province_dto_1.CreateProvinceDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tỉnh được tạo thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 201 },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã tỉnh, tên tỉnh hoặc tên viết tắt đã tồn tại' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_province_dto_1.CreateProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "createProvince", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cập nhật thông tin tỉnh',
        description: 'Cập nhật thông tin của một tỉnh thành'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của tỉnh cần cập nhật', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiBody)({ type: update_province_dto_1.UpdateProvinceDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tỉnh được cập nhật thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tỉnh được cập nhật thành công' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy tỉnh' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã tỉnh, tên tỉnh hoặc tên viết tắt đã tồn tại' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_province_dto_1.UpdateProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "updateProvince", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa tỉnh',
        description: 'Xóa một tỉnh thành khỏi hệ thống (soft delete hoặc hard delete)'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của tỉnh cần xóa', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiQuery)({ name: 'hardDelete', description: 'Xóa cứng hay xóa mềm', required: false, type: 'boolean', example: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tỉnh được xóa thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Tỉnh được xóa thành công' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy tỉnh' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('hardDelete')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "deleteProvince", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách tỉnh',
        description: 'Lấy danh sách tất cả các tỉnh thành với phân trang và bộ lọc'
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Số lượng bản ghi trả về', required: false, type: 'number', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', description: 'Vị trí bắt đầu', required: false, type: 'number', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', description: 'Trường để sắp xếp', required: false, enum: ['sortOrder', 'provinceName', 'provinceCode', 'createdAt'], example: 'sortOrder' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', description: 'Thứ tự sắp xếp', required: false, enum: ['ASC', 'DESC'], example: 'ASC' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', description: 'Lọc theo trạng thái hoạt động', required: false, type: 'boolean', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Tìm kiếm theo tên, mã hoặc tên viết tắt', required: false, type: 'string', example: 'Hà Nội' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách tỉnh được trả về thành công',
        type: provinces_list_response_dto_1.ProvincesListResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_provinces_dto_1.GetProvincesDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "getProvinces", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tìm kiếm tỉnh',
        description: 'Tìm kiếm tỉnh theo từ khóa với các loại tìm kiếm khác nhau'
    }),
    (0, swagger_1.ApiQuery)({ name: 'keyword', description: 'Từ khóa tìm kiếm', required: true, type: 'string', example: 'Hà Nội' }),
    (0, swagger_1.ApiQuery)({ name: 'searchType', description: 'Loại tìm kiếm', required: false, enum: ['name', 'code', 'shortName', 'all'], example: 'all' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Số lượng bản ghi trả về', required: false, type: 'number', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', description: 'Vị trí bắt đầu', required: false, type: 'number', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', description: 'Trường để sắp xếp', required: false, enum: ['sortOrder', 'provinceName', 'provinceCode', 'createdAt'], example: 'sortOrder' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', description: 'Thứ tự sắp xếp', required: false, enum: ['ASC', 'DESC'], example: 'ASC' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kết quả tìm kiếm tỉnh',
        type: provinces_list_response_dto_1.ProvincesListResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Từ khóa tìm kiếm không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_provinces_dto_1.SearchProvincesDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "searchProvinces", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thông tin tỉnh theo ID',
        description: 'Lấy thông tin chi tiết của một tỉnh thành theo ID'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của tỉnh cần lấy thông tin', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiQuery)({ name: 'includeDeleted', description: 'Bao gồm cả các bản ghi đã bị xóa mềm', required: false, type: 'boolean', example: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin tỉnh được trả về thành công',
        type: province_response_dto_1.ProvinceResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy tỉnh' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "getProvinceById", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thống kê tổng quan',
        description: 'Lấy thống kê tổng quan về số lượng tỉnh thành'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thống kê tổng quan được trả về thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', example: 63 },
                        active: { type: 'number', example: 60 },
                        inactive: { type: 'number', example: 3 }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "getProvincesStats", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sắp xếp lại thứ tự tỉnh',
        description: 'Sắp xếp lại thứ tự của tất cả các tỉnh thành'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thứ tự tỉnh được sắp xếp lại thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Thứ tự tỉnh được sắp xếp lại thành công' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "reorderProvinces", null);
__decorate([
    (0, common_1.Get)('with-wards'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách tỉnh với xã phường',
        description: 'Lấy danh sách tỉnh kèm theo danh sách xã phường của từng tỉnh (sử dụng DataLoader để tối ưu performance)'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách tỉnh với xã phường được trả về thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        provinces: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' },
                                    provinceCode: { type: 'string', example: 'HN' },
                                    provinceName: { type: 'string', example: 'Hà Nội' },
                                    shortName: { type: 'string', example: 'Hà Nội' },
                                    sortOrder: { type: 'number', example: 1 },
                                    isActive: { type: 'boolean', example: true },
                                    wards: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                wardCode: { type: 'string' },
                                                wardName: { type: 'string' },
                                                shortName: { type: 'string' },
                                                sortOrder: { type: 'number' },
                                                isActive: { type: 'boolean' }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        total: { type: 'number', example: 10 },
                        limit: { type: 'number', example: 10 },
                        offset: { type: 'number', example: 0 }
                    }
                }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_provinces_dto_1.GetProvincesDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "getProvincesWithWards", null);
__decorate([
    (0, common_1.Get)('with-branches'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách tỉnh với chi nhánh',
        description: 'Lấy danh sách tỉnh kèm theo danh sách chi nhánh của từng tỉnh (sử dụng DataLoader để tối ưu performance)'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách tỉnh với chi nhánh được trả về thành công'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_provinces_dto_1.GetProvincesDto]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "getProvincesWithBranches", null);
exports.ProvinceController = ProvinceController = __decorate([
    (0, swagger_1.ApiTags)('Provinces'),
    (0, common_1.Controller)('provinces'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [province_service_1.ProvinceService])
], ProvinceController);
//# sourceMappingURL=province.controller.js.map