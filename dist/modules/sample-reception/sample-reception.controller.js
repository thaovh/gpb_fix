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
exports.SampleReceptionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sample_reception_service_1 = require("./sample-reception.service");
const create_sample_reception_dto_1 = require("./dto/commands/create-sample-reception.dto");
const get_sample_receptions_dto_1 = require("./dto/queries/get-sample-receptions.dto");
const generate_code_dto_1 = require("./dto/queries/generate-code.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let SampleReceptionController = class SampleReceptionController {
    constructor(sampleReceptionService) {
        this.sampleReceptionService = sampleReceptionService;
    }
    async createSampleReception(createDto, currentUser) {
        const receptionId = await this.sampleReceptionService.createSampleReception(createDto, currentUser);
        const reception = await this.sampleReceptionService.getSampleReceptionById(receptionId);
        return response_builder_1.ResponseBuilder.success({
            id: receptionId,
            receptionCode: reception.receptionCode
        }, common_1.HttpStatus.CREATED);
    }
    async deleteSampleReception(id) {
        await this.sampleReceptionService.deleteSampleReception(id);
        return response_builder_1.ResponseBuilder.success({ message: 'Sample reception deleted successfully' });
    }
    async getSampleReceptions(query) {
        const result = await this.sampleReceptionService.getSampleReceptions(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getTodayReceptions() {
        const receptions = await this.sampleReceptionService.getTodayReceptions();
        return response_builder_1.ResponseBuilder.success(receptions);
    }
    async generateCodePreview(query) {
        const result = await this.sampleReceptionService.generateCodePreview(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getSampleReceptionById(id) {
        const reception = await this.sampleReceptionService.getSampleReceptionById(id);
        return response_builder_1.ResponseBuilder.success(reception);
    }
};
exports.SampleReceptionController = SampleReceptionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tạo mã tiếp nhận mẫu mới',
        description: 'Tạo mã tiếp nhận mẫu mới với format: {LOẠI_MẪU}.{YYYYMMDD}.{SỐ_THỨ_TỰ}'
    }),
    (0, swagger_1.ApiBody)({ type: create_sample_reception_dto_1.CreateSampleReceptionDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Mã tiếp nhận được tạo thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                status_code: { type: 'number' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        receptionCode: { type: 'string', example: 'BLOOD.20241024.0001' }
                    }
                }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sample_reception_dto_1.CreateSampleReceptionDto, Object]),
    __metadata("design:returntype", Promise)
], SampleReceptionController.prototype, "createSampleReception", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa mã tiếp nhận',
        description: 'Xóa mã tiếp nhận khỏi hệ thống'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của mã tiếp nhận' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SampleReceptionController.prototype, "deleteSampleReception", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách mã tiếp nhận',
        description: 'Lấy danh sách mã tiếp nhận với phân trang và tìm kiếm'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_sample_receptions_dto_1.GetSampleReceptionsDto]),
    __metadata("design:returntype", Promise)
], SampleReceptionController.prototype, "getSampleReceptions", null);
__decorate([
    (0, common_1.Get)('today'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách mã tiếp nhận hôm nay',
        description: 'Lấy danh sách mã tiếp nhận được tạo trong ngày hôm nay'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SampleReceptionController.prototype, "getTodayReceptions", null);
__decorate([
    (0, common_1.Get)('generate-code'),
    (0, swagger_1.ApiOperation)({
        summary: 'Xem trước mã tiếp nhận',
        description: 'Xem trước mã tiếp nhận sẽ được sinh cho loại mẫu và ngày cụ thể'
    }),
    (0, swagger_1.ApiQuery)({ name: 'sampleTypeCode', description: 'Mã loại mẫu', example: 'BLOOD' }),
    (0, swagger_1.ApiQuery)({ name: 'date', description: 'Ngày sinh mã (YYYY-MM-DD)', example: '2024-10-24', required: false }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_code_dto_1.GenerateCodeDto]),
    __metadata("design:returntype", Promise)
], SampleReceptionController.prototype, "generateCodePreview", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thông tin mã tiếp nhận',
        description: 'Lấy thông tin chi tiết mã tiếp nhận theo ID'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của mã tiếp nhận' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SampleReceptionController.prototype, "getSampleReceptionById", null);
exports.SampleReceptionController = SampleReceptionController = __decorate([
    (0, swagger_1.ApiTags)('Sample Receptions'),
    (0, common_1.Controller)('sample-receptions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [sample_reception_service_1.SampleReceptionService])
], SampleReceptionController);
//# sourceMappingURL=sample-reception.controller.js.map