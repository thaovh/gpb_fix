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
exports.DepartmentTypeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DepartmentTypeResponseDto {
}
exports.DepartmentTypeResponseDto = DepartmentTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID loại khoa',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    __metadata("design:type", String)
], DepartmentTypeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã loại khoa',
        example: 'KHOA',
    }),
    __metadata("design:type", String)
], DepartmentTypeResponseDto.prototype, "typeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên loại khoa',
        example: 'Khoa',
    }),
    __metadata("design:type", String)
], DepartmentTypeResponseDto.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả loại khoa',
        example: 'Các khoa chuyên môn trong bệnh viện',
        required: false,
    }),
    __metadata("design:type", String)
], DepartmentTypeResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên hiển thị',
        example: 'KHOA - Khoa',
    }),
    __metadata("design:type", String)
], DepartmentTypeResponseDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: 1,
    }),
    __metadata("design:type", Number)
], DepartmentTypeResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true,
    }),
    __metadata("design:type", Boolean)
], DepartmentTypeResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phiên bản',
        example: 1,
    }),
    __metadata("design:type", Number)
], DepartmentTypeResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày tạo',
        example: '2024-01-15T10:30:00Z',
    }),
    __metadata("design:type", Date)
], DepartmentTypeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày cập nhật',
        example: '2024-01-15T10:30:00Z',
    }),
    __metadata("design:type", Date)
], DepartmentTypeResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=department-type-response.dto.js.map