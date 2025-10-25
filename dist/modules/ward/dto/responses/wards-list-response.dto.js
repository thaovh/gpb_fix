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
exports.WardsListResponseDto = exports.WardPaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ward_response_dto_1 = require("./ward-response.dto");
class WardPaginationDto {
}
exports.WardPaginationDto = WardPaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số bản ghi',
        example: 1000
    }),
    __metadata("design:type", Number)
], WardPaginationDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trên trang',
        example: 10
    }),
    __metadata("design:type", Number)
], WardPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vị trí bắt đầu',
        example: 0
    }),
    __metadata("design:type", Number)
], WardPaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang tiếp theo',
        example: true
    }),
    __metadata("design:type", Boolean)
], WardPaginationDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang trước',
        example: false
    }),
    __metadata("design:type", Boolean)
], WardPaginationDto.prototype, "hasPrev", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số trang',
        example: 100
    }),
    __metadata("design:type", Number)
], WardPaginationDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trang hiện tại',
        example: 1
    }),
    __metadata("design:type", Number)
], WardPaginationDto.prototype, "currentPage", void 0);
class WardsListResponseDto {
}
exports.WardsListResponseDto = WardsListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách các xã',
        type: [ward_response_dto_1.WardResponseDto]
    }),
    __metadata("design:type", Array)
], WardsListResponseDto.prototype, "wards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin phân trang',
        type: WardPaginationDto
    }),
    __metadata("design:type", WardPaginationDto)
], WardsListResponseDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin thống kê',
        example: {
            total: 1000,
            active: 950,
            inactive: 50,
            byProvince: {
                '550e8400-e29b-41d4-a716-446655440001': 30,
                '550e8400-e29b-41d4-a716-446655440002': 25
            }
        }
    }),
    __metadata("design:type", Object)
], WardsListResponseDto.prototype, "statistics", void 0);
//# sourceMappingURL=wards-list-response.dto.js.map