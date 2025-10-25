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
exports.ProvincesListResponseDto = exports.ProvincePaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const province_response_dto_1 = require("./province-response.dto");
class ProvincePaginationDto {
}
exports.ProvincePaginationDto = ProvincePaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số bản ghi',
        example: 63
    }),
    __metadata("design:type", Number)
], ProvincePaginationDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trên trang',
        example: 10
    }),
    __metadata("design:type", Number)
], ProvincePaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vị trí bắt đầu',
        example: 0
    }),
    __metadata("design:type", Number)
], ProvincePaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang tiếp theo',
        example: true
    }),
    __metadata("design:type", Boolean)
], ProvincePaginationDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang trước',
        example: false
    }),
    __metadata("design:type", Boolean)
], ProvincePaginationDto.prototype, "hasPrev", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số trang',
        example: 7
    }),
    __metadata("design:type", Number)
], ProvincePaginationDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trang hiện tại',
        example: 1
    }),
    __metadata("design:type", Number)
], ProvincePaginationDto.prototype, "currentPage", void 0);
class ProvincesListResponseDto {
}
exports.ProvincesListResponseDto = ProvincesListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách các tỉnh',
        type: [province_response_dto_1.ProvinceResponseDto]
    }),
    __metadata("design:type", Array)
], ProvincesListResponseDto.prototype, "provinces", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin phân trang',
        type: ProvincePaginationDto
    }),
    __metadata("design:type", ProvincePaginationDto)
], ProvincesListResponseDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin thống kê',
        example: {
            total: 63,
            active: 60,
            inactive: 3
        }
    }),
    __metadata("design:type", Object)
], ProvincesListResponseDto.prototype, "statistics", void 0);
//# sourceMappingURL=provinces-list-response.dto.js.map