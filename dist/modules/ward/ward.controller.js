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
exports.WardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ward_service_1 = require("./ward.service");
const create_ward_dto_1 = require("./dto/commands/create-ward.dto");
const update_ward_dto_1 = require("./dto/commands/update-ward.dto");
const get_wards_dto_1 = require("./dto/queries/get-wards.dto");
const search_wards_dto_1 = require("./dto/queries/search-wards.dto");
const ward_response_dto_1 = require("./dto/responses/ward-response.dto");
const wards_list_response_dto_1 = require("./dto/responses/wards-list-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let WardController = class WardController {
    constructor(wardService) {
        this.wardService = wardService;
    }
    async createWard(createWardDto, currentUser) {
        const wardId = await this.wardService.createWard(createWardDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ id: wardId }, 201);
    }
    async updateWard(id, updateWardDto, currentUser) {
        await this.wardService.updateWard(id, updateWardDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Xã được cập nhật thành công' });
    }
    async deleteWard(id, hardDelete, req) {
        const currentUser = {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
        };
        const deleteWardDto = {
            id,
            hardDelete: hardDelete === 'true',
        };
        await this.wardService.deleteWard(deleteWardDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Xã được xóa thành công' });
    }
    async getWards(getWardsDto) {
        const result = await this.wardService.getWards(getWardsDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async searchWards(searchWardsDto) {
        const result = await this.wardService.searchWards(searchWardsDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getWardsByProvince(provinceId, getWardsByProvinceDto) {
        const result = await this.wardService.getWardsByProvince({
            ...getWardsByProvinceDto,
            provinceId,
        });
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getWardById(id, includeDeleted) {
        const getWardByIdDto = {
            id,
            includeDeleted: includeDeleted === 'true',
        };
        const result = await this.wardService.getWardById(getWardByIdDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getWardsStats() {
        const result = await this.wardService.getWardsStats();
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getWardsStatsByProvince(provinceId) {
        const result = await this.wardService.getWardsStatsByProvince(provinceId);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async reorderWards(provinceId) {
        await this.wardService.reorderWards(provinceId);
        return response_builder_1.ResponseBuilder.success({ message: 'Thứ tự xã được sắp xếp lại thành công' });
    }
};
exports.WardController = WardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tạo xã mới',
        description: 'Tạo một xã mới trong hệ thống'
    }),
    (0, swagger_1.ApiBody)({ type: create_ward_dto_1.CreateWardDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Xã được tạo thành công',
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
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tỉnh không tồn tại' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã xã, tên xã hoặc tên viết tắt đã tồn tại' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ward_dto_1.CreateWardDto, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "createWard", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cập nhật thông tin xã',
        description: 'Cập nhật thông tin của một xã'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của xã cần cập nhật', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiBody)({ type: update_ward_dto_1.UpdateWardDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xã được cập nhật thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xã được cập nhật thành công' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy xã hoặc tỉnh' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã xã, tên xã hoặc tên viết tắt đã tồn tại' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ward_dto_1.UpdateWardDto, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "updateWard", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa xã',
        description: 'Xóa một xã khỏi hệ thống (soft delete hoặc hard delete)'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của xã cần xóa', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiQuery)({ name: 'hardDelete', description: 'Xóa cứng hay xóa mềm', required: false, type: 'boolean', example: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xã được xóa thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xã được xóa thành công' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy xã' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('hardDelete')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "deleteWard", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách xã',
        description: 'Lấy danh sách tất cả các xã với phân trang và bộ lọc'
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Số lượng bản ghi trả về', required: false, type: 'number', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', description: 'Vị trí bắt đầu', required: false, type: 'number', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', description: 'Trường để sắp xếp', required: false, enum: ['sortOrder', 'wardName', 'wardCode', 'createdAt'], example: 'sortOrder' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', description: 'Thứ tự sắp xếp', required: false, enum: ['ASC', 'DESC'], example: 'ASC' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', description: 'Lọc theo trạng thái hoạt động', required: false, type: 'boolean', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'provinceId', description: 'Lọc theo ID tỉnh', required: false, type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Tìm kiếm theo tên, mã hoặc tên viết tắt', required: false, type: 'string', example: 'Phúc Xá' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách xã được trả về thành công',
        type: wards_list_response_dto_1.WardsListResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_wards_dto_1.GetWardsDto]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "getWards", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tìm kiếm xã',
        description: 'Tìm kiếm xã theo từ khóa với các loại tìm kiếm khác nhau'
    }),
    (0, swagger_1.ApiQuery)({ name: 'keyword', description: 'Từ khóa tìm kiếm', required: true, type: 'string', example: 'Phúc Xá' }),
    (0, swagger_1.ApiQuery)({ name: 'searchType', description: 'Loại tìm kiếm', required: false, enum: ['name', 'code', 'shortName', 'all'], example: 'all' }),
    (0, swagger_1.ApiQuery)({ name: 'provinceId', description: 'Lọc theo ID tỉnh', required: false, type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Số lượng bản ghi trả về', required: false, type: 'number', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', description: 'Vị trí bắt đầu', required: false, type: 'number', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', description: 'Trường để sắp xếp', required: false, enum: ['sortOrder', 'wardName', 'wardCode', 'createdAt'], example: 'sortOrder' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', description: 'Thứ tự sắp xếp', required: false, enum: ['ASC', 'DESC'], example: 'ASC' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kết quả tìm kiếm xã',
        type: wards_list_response_dto_1.WardsListResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Từ khóa tìm kiếm không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_wards_dto_1.SearchWardsDto]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "searchWards", null);
__decorate([
    (0, common_1.Get)('province/:provinceId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách xã theo tỉnh',
        description: 'Lấy danh sách các xã thuộc về một tỉnh cụ thể'
    }),
    (0, swagger_1.ApiParam)({ name: 'provinceId', description: 'ID của tỉnh', example: '550e8400-e29b-41d4-a716-446655440001' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Số lượng bản ghi trả về', required: false, type: 'number', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', description: 'Vị trí bắt đầu', required: false, type: 'number', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', description: 'Trường để sắp xếp', required: false, enum: ['sortOrder', 'wardName', 'wardCode', 'createdAt'], example: 'sortOrder' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', description: 'Thứ tự sắp xếp', required: false, enum: ['ASC', 'DESC'], example: 'ASC' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', description: 'Lọc theo trạng thái hoạt động', required: false, type: 'boolean', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Tìm kiếm theo tên, mã hoặc tên viết tắt', required: false, type: 'string', example: 'Phúc Xá' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách xã theo tỉnh được trả về thành công',
        type: wards_list_response_dto_1.WardsListResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy tỉnh' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('provinceId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "getWardsByProvince", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thông tin xã theo ID',
        description: 'Lấy thông tin chi tiết của một xã theo ID'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của xã cần lấy thông tin', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiQuery)({ name: 'includeDeleted', description: 'Bao gồm cả các bản ghi đã bị xóa mềm', required: false, type: 'boolean', example: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin xã được trả về thành công',
        type: ward_response_dto_1.WardResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy xã' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "getWardById", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thống kê tổng quan',
        description: 'Lấy thống kê tổng quan về số lượng xã'
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
                        total: { type: 'number', example: 1000 },
                        active: { type: 'number', example: 950 },
                        inactive: { type: 'number', example: 50 }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WardController.prototype, "getWardsStats", null);
__decorate([
    (0, common_1.Get)('stats/province/:provinceId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thống kê xã theo tỉnh',
        description: 'Lấy thống kê số lượng xã của một tỉnh cụ thể'
    }),
    (0, swagger_1.ApiParam)({ name: 'provinceId', description: 'ID của tỉnh', example: '550e8400-e29b-41d4-a716-446655440001' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thống kê xã theo tỉnh được trả về thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', example: 30 },
                        active: { type: 'number', example: 28 },
                        inactive: { type: 'number', example: 2 }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy tỉnh' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "getWardsStatsByProvince", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sắp xếp lại thứ tự xã',
        description: 'Sắp xếp lại thứ tự của tất cả các xã hoặc xã trong một tỉnh'
    }),
    (0, swagger_1.ApiQuery)({ name: 'provinceId', description: 'ID của tỉnh (tùy chọn)', required: false, type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thứ tự xã được sắp xếp lại thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Thứ tự xã được sắp xếp lại thành công' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "reorderWards", null);
exports.WardController = WardController = __decorate([
    (0, swagger_1.ApiTags)('Wards'),
    (0, common_1.Controller)('wards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [ward_service_1.WardService])
], WardController);
//# sourceMappingURL=ward.controller.js.map