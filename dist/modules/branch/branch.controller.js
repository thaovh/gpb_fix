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
exports.BranchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const branch_service_1 = require("./branch.service");
const create_branch_dto_1 = require("./dto/commands/create-branch.dto");
const update_branch_dto_1 = require("./dto/commands/update-branch.dto");
const get_branches_dto_1 = require("./dto/queries/get-branches.dto");
const search_branches_dto_1 = require("./dto/queries/search-branches.dto");
const get_branches_by_province_dto_1 = require("./dto/queries/get-branches-by-province.dto");
const get_branches_by_ward_dto_1 = require("./dto/queries/get-branches-by-ward.dto");
const branch_response_dto_1 = require("./dto/responses/branch-response.dto");
const branches_list_response_dto_1 = require("./dto/responses/branches-list-response.dto");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let BranchController = class BranchController {
    constructor(branchService) {
        this.branchService = branchService;
    }
    async createBranch(createBranchDto, currentUser) {
        const branch = await this.branchService.createBranch(createBranchDto, currentUser.id);
        return response_builder_1.ResponseBuilder.success(branch, common_1.HttpStatus.CREATED);
    }
    async updateBranch(id, updateBranchDto, currentUser) {
        const branch = await this.branchService.updateBranch(id, updateBranchDto, currentUser.username);
        return response_builder_1.ResponseBuilder.success(branch);
    }
    async deleteBranch(id, currentUser) {
        await this.branchService.deleteBranch(id, currentUser.username);
        return response_builder_1.ResponseBuilder.success(null, common_1.HttpStatus.NO_CONTENT);
    }
    async hardDeleteBranch(id) {
        await this.branchService.hardDeleteBranch(id);
        return response_builder_1.ResponseBuilder.success(null, common_1.HttpStatus.NO_CONTENT);
    }
    async getBranches(getBranchesDto) {
        const result = await this.branchService.getBranches(getBranchesDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async searchBranches(searchBranchesDto) {
        const result = await this.branchService.searchBranches(searchBranchesDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getBranchesByProvince(provinceId, getBranchesByProvinceDto) {
        const result = await this.branchService.getBranchesByProvince({
            ...getBranchesByProvinceDto,
            provinceId,
        });
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getBranchesByWard(wardId, getBranchesByWardDto) {
        const result = await this.branchService.getBranchesByWard({
            ...getBranchesByWardDto,
            wardId,
        });
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getBranchById(id) {
        const branch = await this.branchService.getBranchById(id);
        return response_builder_1.ResponseBuilder.success(branch);
    }
    async getBranchStats() {
        const stats = await this.branchService.getBranchStats();
        return response_builder_1.ResponseBuilder.success(stats);
    }
};
exports.BranchController = BranchController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tạo chi nhánh mới',
        description: 'Tạo một chi nhánh mới với thông tin đầy đủ'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Chi nhánh được tạo thành công',
        type: branch_response_dto_1.BranchResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dữ liệu đầu vào không hợp lệ'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Chi nhánh với mã/tên/BHYT/số điện thoại đã tồn tại'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_branch_dto_1.CreateBranchDto, Object]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "createBranch", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cập nhật chi nhánh',
        description: 'Cập nhật thông tin chi nhánh theo ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID của chi nhánh cần cập nhật',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Chi nhánh được cập nhật thành công',
        type: branch_response_dto_1.BranchResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dữ liệu đầu vào không hợp lệ'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Chi nhánh không tồn tại'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Chi nhánh với mã/tên/BHYT/số điện thoại đã tồn tại'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_branch_dto_1.UpdateBranchDto, Object]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "updateBranch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa chi nhánh (soft delete)',
        description: 'Xóa mềm chi nhánh theo ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID của chi nhánh cần xóa',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Chi nhánh được xóa thành công'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Chi nhánh không tồn tại'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "deleteBranch", null);
__decorate([
    (0, common_1.Delete)(':id/hard'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa cứng chi nhánh',
        description: 'Xóa cứng chi nhánh theo ID (không thể khôi phục)'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID của chi nhánh cần xóa cứng',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Chi nhánh được xóa cứng thành công'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Chi nhánh không tồn tại'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "hardDeleteBranch", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách chi nhánh',
        description: 'Lấy danh sách chi nhánh với phân trang, lọc và sắp xếp'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        description: 'Số lượng bản ghi trả về',
        required: false,
        type: Number,
        example: 10
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        description: 'Vị trí bắt đầu',
        required: false,
        type: Number,
        example: 0
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        description: 'Trường để sắp xếp',
        required: false,
        enum: ['branchName', 'branchCode', 'hospitalLevel', 'createdAt'],
        example: 'branchName'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        description: 'Thứ tự sắp xếp',
        required: false,
        enum: ['ASC', 'DESC'],
        example: 'ASC'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        description: 'Lọc theo trạng thái hoạt động',
        required: false,
        type: Boolean,
        example: true
    }),
    (0, swagger_1.ApiQuery)({
        name: 'provinceId',
        description: 'Lọc theo ID tỉnh',
        required: false,
        type: String,
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'wardId',
        description: 'Lọc theo ID xã',
        required: false,
        type: String,
        example: '550e8400-e29b-41d4-a716-446655440101'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'hospitalLevel',
        description: 'Lọc theo cấp bệnh viện',
        required: false,
        enum: ['Tuyến 1', 'Tuyến 2', 'Tuyến 3', 'Tuyến 4'],
        example: 'Tuyến 1'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'Tìm kiếm theo tên, mã, địa chỉ, đại diện',
        required: false,
        type: String,
        example: 'Chi nhánh Hà Nội'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách chi nhánh được lấy thành công',
        type: branches_list_response_dto_1.BranchesListResponseDto
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_branches_dto_1.GetBranchesDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "getBranches", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tìm kiếm chi nhánh',
        description: 'Tìm kiếm chi nhánh theo từ khóa và loại tìm kiếm'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'keyword',
        description: 'Từ khóa tìm kiếm',
        required: true,
        type: String,
        example: 'Chi nhánh Hà Nội'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'searchType',
        description: 'Loại tìm kiếm',
        required: false,
        enum: ['name', 'code', 'shortName', 'address', 'phone', 'representative', 'bhy', 'hospitalLevel', 'all'],
        example: 'all'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'provinceId',
        description: 'Lọc theo ID tỉnh',
        required: false,
        type: String,
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'wardId',
        description: 'Lọc theo ID xã',
        required: false,
        type: String,
        example: '550e8400-e29b-41d4-a716-446655440101'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'hospitalLevel',
        description: 'Lọc theo cấp bệnh viện',
        required: false,
        enum: ['Tuyến 1', 'Tuyến 2', 'Tuyến 3', 'Tuyến 4'],
        example: 'Tuyến 1'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        description: 'Số lượng bản ghi trả về',
        required: false,
        type: Number,
        example: 10
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        description: 'Vị trí bắt đầu',
        required: false,
        type: Number,
        example: 0
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kết quả tìm kiếm chi nhánh',
        type: branches_list_response_dto_1.BranchesListResponseDto
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_branches_dto_1.SearchBranchesDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "searchBranches", null);
__decorate([
    (0, common_1.Get)('province/:provinceId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy chi nhánh theo tỉnh',
        description: 'Lấy danh sách chi nhánh thuộc về một tỉnh cụ thể'
    }),
    (0, swagger_1.ApiParam)({
        name: 'provinceId',
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        description: 'Số lượng bản ghi trả về',
        required: false,
        type: Number,
        example: 10
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        description: 'Vị trí bắt đầu',
        required: false,
        type: Number,
        example: 0
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        description: 'Lọc theo trạng thái hoạt động',
        required: false,
        type: Boolean,
        example: true
    }),
    (0, swagger_1.ApiQuery)({
        name: 'hospitalLevel',
        description: 'Lọc theo cấp bệnh viện',
        required: false,
        enum: ['Tuyến 1', 'Tuyến 2', 'Tuyến 3', 'Tuyến 4'],
        example: 'Tuyến 1'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'Tìm kiếm theo tên, mã, địa chỉ, đại diện',
        required: false,
        type: String,
        example: 'Chi nhánh Hà Nội'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách chi nhánh theo tỉnh',
        type: branches_list_response_dto_1.BranchesListResponseDto
    }),
    __param(0, (0, common_1.Param)('provinceId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_branches_by_province_dto_1.GetBranchesByProvinceDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "getBranchesByProvince", null);
__decorate([
    (0, common_1.Get)('ward/:wardId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy chi nhánh theo xã',
        description: 'Lấy danh sách chi nhánh thuộc về một xã cụ thể'
    }),
    (0, swagger_1.ApiParam)({
        name: 'wardId',
        description: 'ID của xã',
        example: '550e8400-e29b-41d4-a716-446655440101'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        description: 'Số lượng bản ghi trả về',
        required: false,
        type: Number,
        example: 10
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        description: 'Vị trí bắt đầu',
        required: false,
        type: Number,
        example: 0
    }),
    (0, swagger_1.ApiQuery)({
        name: 'isActive',
        description: 'Lọc theo trạng thái hoạt động',
        required: false,
        type: Boolean,
        example: true
    }),
    (0, swagger_1.ApiQuery)({
        name: 'hospitalLevel',
        description: 'Lọc theo cấp bệnh viện',
        required: false,
        enum: ['Tuyến 1', 'Tuyến 2', 'Tuyến 3', 'Tuyến 4'],
        example: 'Tuyến 1'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'Tìm kiếm theo tên, mã, địa chỉ, đại diện',
        required: false,
        type: String,
        example: 'Chi nhánh Hà Nội'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách chi nhánh theo xã',
        type: branches_list_response_dto_1.BranchesListResponseDto
    }),
    __param(0, (0, common_1.Param)('wardId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_branches_by_ward_dto_1.GetBranchesByWardDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "getBranchesByWard", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thông tin chi nhánh theo ID',
        description: 'Lấy thông tin chi tiết của một chi nhánh theo ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID của chi nhánh',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin chi nhánh',
        type: branch_response_dto_1.BranchResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Chi nhánh không tồn tại'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "getBranchById", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thống kê tổng quan chi nhánh',
        description: 'Lấy thống kê tổng quan về số lượng chi nhánh theo các tiêu chí'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thống kê tổng quan chi nhánh',
        schema: {
            type: 'object',
            properties: {
                totalBranches: { type: 'number', example: 100 },
                activeBranches: { type: 'number', example: 95 },
                inactiveBranches: { type: 'number', example: 5 },
                softDeletedBranches: { type: 'number', example: 0 },
                branchesByLevel: {
                    type: 'object',
                    example: {
                        'Tuyến 1': 20,
                        'Tuyến 2': 30,
                        'Tuyến 3': 40,
                        'Tuyến 4': 10
                    }
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "getBranchStats", null);
exports.BranchController = BranchController = __decorate([
    (0, swagger_1.ApiTags)('Branches'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('branches'),
    __metadata("design:paramtypes", [branch_service_1.BranchService])
], BranchController);
//# sourceMappingURL=branch.controller.js.map