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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesListResponseDto = exports.BranchStatsDto = exports.BranchPaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const branch_response_dto_1 = require("./branch-response.dto");
class BranchPaginationDto {
}
exports.BranchPaginationDto = BranchPaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số bản ghi',
        example: 100
    }),
    __metadata("design:type", Number)
], BranchPaginationDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trên trang',
        example: 10
    }),
    __metadata("design:type", Number)
], BranchPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vị trí bắt đầu',
        example: 0
    }),
    __metadata("design:type", Number)
], BranchPaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trang hiện tại',
        example: 1
    }),
    __metadata("design:type", Number)
], BranchPaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số trang',
        example: 10
    }),
    __metadata("design:type", Number)
], BranchPaginationDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang tiếp theo',
        example: true
    }),
    __metadata("design:type", Boolean)
], BranchPaginationDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang trước',
        example: false
    }),
    __metadata("design:type", Boolean)
], BranchPaginationDto.prototype, "hasPrev", void 0);
class BranchStatsDto {
}
exports.BranchStatsDto = BranchStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số chi nhánh',
        example: 100
    }),
    __metadata("design:type", Number)
], BranchStatsDto.prototype, "totalBranches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số chi nhánh đang hoạt động',
        example: 95
    }),
    __metadata("design:type", Number)
], BranchStatsDto.prototype, "activeBranches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số chi nhánh không hoạt động',
        example: 5
    }),
    __metadata("design:type", Number)
], BranchStatsDto.prototype, "inactiveBranches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số chi nhánh bị xóa mềm',
        example: 0
    }),
    __metadata("design:type", Number)
], BranchStatsDto.prototype, "softDeletedBranches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số chi nhánh theo cấp bệnh viện',
        example: {
            'Tuyến 1': 20,
            'Tuyến 2': 30,
            'Tuyến 3': 40,
            'Tuyến 4': 10
        }
    }),
    __metadata("design:type", Object)
], BranchStatsDto.prototype, "branchesByLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số chi nhánh theo tỉnh',
        example: {
            'Hà Nội': 25,
            'TP.HCM': 30,
            'Đà Nẵng': 15
        }
    }),
    __metadata("design:type", Object)
], BranchStatsDto.prototype, "branchesByProvince", void 0);
class BranchesListResponseDto {
}
exports.BranchesListResponseDto = BranchesListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách chi nhánh',
        type: [branch_response_dto_1.BranchResponseDto]
    }),
    __metadata("design:type", Array)
], BranchesListResponseDto.prototype, "branches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin phân trang',
        type: BranchPaginationDto
    }),
    __metadata("design:type", BranchPaginationDto)
], BranchesListResponseDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thống kê tổng quan',
        type: BranchStatsDto,
        required: false
    }),
    __metadata("design:type", BranchStatsDto)
], BranchesListResponseDto.prototype, "stats", void 0);
//# sourceMappingURL=branches-list-response.dto.js.map