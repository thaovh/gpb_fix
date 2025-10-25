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
exports.SampleTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sample_type_service_1 = require("./sample-type.service");
const create_sample_type_dto_1 = require("./dto/commands/create-sample-type.dto");
const update_sample_type_dto_1 = require("./dto/commands/update-sample-type.dto");
const get_sample_types_dto_1 = require("./dto/queries/get-sample-types.dto");
const search_sample_types_dto_1 = require("./dto/queries/search-sample-types.dto");
const sample_type_response_dto_1 = require("./dto/responses/sample-type-response.dto");
const sample_types_list_response_dto_1 = require("./dto/responses/sample-types-list-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let SampleTypeController = class SampleTypeController {
    constructor(sampleTypeService) {
        this.sampleTypeService = sampleTypeService;
    }
    async createSampleType(createDto, currentUser) {
        const sampleTypeId = await this.sampleTypeService.createSampleType(createDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ id: sampleTypeId }, common_1.HttpStatus.CREATED);
    }
    async updateSampleType(id, updateDto, currentUser) {
        await this.sampleTypeService.updateSampleType(id, updateDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Sample type updated successfully' });
    }
    async deleteSampleType(id) {
        await this.sampleTypeService.deleteSampleType(id);
        return response_builder_1.ResponseBuilder.success({ message: 'Sample type deleted successfully' });
    }
    async getSampleTypes(query) {
        const result = await this.sampleTypeService.getSampleTypes(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getActiveSampleTypes() {
        const sampleTypes = await this.sampleTypeService.getActiveSampleTypes();
        return response_builder_1.ResponseBuilder.success(sampleTypes);
    }
    async searchSampleTypes(searchDto) {
        const sampleTypes = await this.sampleTypeService.searchSampleTypes(searchDto.q);
        return response_builder_1.ResponseBuilder.success(sampleTypes);
    }
    async getSampleTypeById(id) {
        const sampleType = await this.sampleTypeService.getSampleTypeById(id);
        return response_builder_1.ResponseBuilder.success(sampleType);
    }
};
exports.SampleTypeController = SampleTypeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tạo loại mẫu mới',
        description: 'Tạo một loại mẫu mới trong hệ thống'
    }),
    (0, swagger_1.ApiBody)({ type: create_sample_type_dto_1.CreateSampleTypeDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Loại mẫu được tạo thành công',
        type: sample_type_response_dto_1.SampleTypeResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dữ liệu đầu vào không hợp lệ'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Loại mẫu với mã/tên đã tồn tại'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sample_type_dto_1.CreateSampleTypeDto, Object]),
    __metadata("design:returntype", Promise)
], SampleTypeController.prototype, "createSampleType", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cập nhật loại mẫu',
        description: 'Cập nhật thông tin loại mẫu'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID loại mẫu' }),
    (0, swagger_1.ApiBody)({ type: update_sample_type_dto_1.UpdateSampleTypeDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Loại mẫu được cập nhật thành công'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy loại mẫu'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Loại mẫu với mã/tên đã tồn tại'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sample_type_dto_1.UpdateSampleTypeDto, Object]),
    __metadata("design:returntype", Promise)
], SampleTypeController.prototype, "updateSampleType", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa loại mẫu',
        description: 'Xóa loại mẫu khỏi hệ thống'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID loại mẫu' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Loại mẫu được xóa thành công'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy loại mẫu'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SampleTypeController.prototype, "deleteSampleType", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách loại mẫu',
        description: 'Lấy danh sách loại mẫu với phân trang và tìm kiếm'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách loại mẫu',
        type: sample_types_list_response_dto_1.SampleTypesListResponseDto
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_sample_types_dto_1.GetSampleTypesDto]),
    __metadata("design:returntype", Promise)
], SampleTypeController.prototype, "getSampleTypes", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách loại mẫu đang hoạt động',
        description: 'Lấy danh sách loại mẫu đang hoạt động, sắp xếp theo thứ tự'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách loại mẫu đang hoạt động',
        type: [sample_type_response_dto_1.SampleTypeResponseDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SampleTypeController.prototype, "getActiveSampleTypes", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tìm kiếm loại mẫu',
        description: 'Tìm kiếm loại mẫu theo từ khóa'
    }),
    (0, swagger_1.ApiQuery)({ name: 'q', description: 'Từ khóa tìm kiếm' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kết quả tìm kiếm loại mẫu',
        type: [sample_type_response_dto_1.SampleTypeResponseDto]
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_sample_types_dto_1.SearchSampleTypesDto]),
    __metadata("design:returntype", Promise)
], SampleTypeController.prototype, "searchSampleTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thông tin loại mẫu',
        description: 'Lấy thông tin chi tiết loại mẫu theo ID'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID loại mẫu' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin loại mẫu',
        type: sample_type_response_dto_1.SampleTypeResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy loại mẫu'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SampleTypeController.prototype, "getSampleTypeById", null);
exports.SampleTypeController = SampleTypeController = __decorate([
    (0, swagger_1.ApiTags)('Sample Types'),
    (0, common_1.Controller)('sample-types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [sample_type_service_1.SampleTypeService])
], SampleTypeController);
//# sourceMappingURL=sample-type.controller.js.map