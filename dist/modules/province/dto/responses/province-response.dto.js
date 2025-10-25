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
exports.ProvinceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProvinceResponseDto {
}
exports.ProvinceResponseDto = ProvinceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID duy nhất của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    __metadata("design:type", String)
], ProvinceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã tỉnh (2 chữ số)',
        example: '01'
    }),
    __metadata("design:type", String)
], ProvinceResponseDto.prototype, "provinceCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên tỉnh thành',
        example: 'Hà Nội'
    }),
    __metadata("design:type", String)
], ProvinceResponseDto.prototype, "provinceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt của tỉnh',
        example: 'HN'
    }),
    __metadata("design:type", String)
], ProvinceResponseDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: 1
    }),
    __metadata("design:type", Number)
], ProvinceResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true
    }),
    __metadata("design:type", Boolean)
], ProvinceResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày tạo',
        example: '2024-01-15T10:30:00.000Z'
    }),
    __metadata("design:type", Date)
], ProvinceResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày cập nhật cuối',
        example: '2024-01-15T10:30:00.000Z'
    }),
    __metadata("design:type", Date)
], ProvinceResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người tạo',
        example: 'admin',
        required: false
    }),
    __metadata("design:type", String)
], ProvinceResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người cập nhật cuối',
        example: 'admin',
        required: false
    }),
    __metadata("design:type", String)
], ProvinceResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phiên bản',
        example: 1
    }),
    __metadata("design:type", Number)
], ProvinceResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên hiển thị (Mã - Tên)',
        example: '01 - Hà Nội'
    }),
    __metadata("design:type", String)
], ProvinceResponseDto.prototype, "displayName", void 0);
//# sourceMappingURL=province-response.dto.js.map