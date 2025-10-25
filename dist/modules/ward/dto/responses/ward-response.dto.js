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
exports.WardResponseDto = exports.ProvinceInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProvinceInfoDto {
}
exports.ProvinceInfoDto = ProvinceInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã tỉnh',
        example: '01'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "provinceCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên tỉnh',
        example: 'Hà Nội'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "provinceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt của tỉnh',
        example: 'HN'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "shortName", void 0);
class WardResponseDto {
}
exports.WardResponseDto = WardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID duy nhất của xã',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã xã (5 chữ số)',
        example: '01001'
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "wardCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên xã',
        example: 'Phường Phúc Xá'
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "wardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt của xã',
        example: 'PX'
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: 1
    }),
    __metadata("design:type", Number)
], WardResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true
    }),
    __metadata("design:type", Boolean)
], WardResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày tạo',
        example: '2024-01-15T10:30:00.000Z'
    }),
    __metadata("design:type", Date)
], WardResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày cập nhật cuối',
        example: '2024-01-15T10:30:00.000Z'
    }),
    __metadata("design:type", Date)
], WardResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người tạo',
        example: 'admin',
        required: false
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người cập nhật cuối',
        example: 'admin',
        required: false
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phiên bản',
        example: 1
    }),
    __metadata("design:type", Number)
], WardResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên hiển thị (Mã - Tên)',
        example: '01001 - Phường Phúc Xá'
    }),
    __metadata("design:type", String)
], WardResponseDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin tỉnh',
        type: ProvinceInfoDto,
        required: false
    }),
    __metadata("design:type", ProvinceInfoDto)
], WardResponseDto.prototype, "province", void 0);
//# sourceMappingURL=ward-response.dto.js.map