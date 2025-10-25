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
exports.DepartmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DepartmentResponseDto {
}
exports.DepartmentResponseDto = DepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của khoa', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã khoa', example: 'KTM' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên khoa', example: 'Khoa Tim Mạch' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên hiển thị của khoa', example: 'KTM - Khoa Tim Mạch' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID chi nhánh', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên chi nhánh', example: 'Bệnh viện A', nullable: true }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "branchName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trưởng khoa', example: 'BS. Nguyễn Văn A', nullable: true }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "headOfDepartment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Điều dưỡng trưởng', example: 'ĐD. Trần Thị B', nullable: true }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "headNurse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID khoa cha', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', nullable: true }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên khoa cha', example: 'Khoa Nội', nullable: true }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "parentDepartmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên viết tắt', example: 'KTM', nullable: true }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID loại khoa', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên loại khoa', example: 'Khoa', nullable: true }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentTypeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thứ tự sắp xếp', example: 1 }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái hoạt động', example: true }),
    __metadata("design:type", Boolean)
], DepartmentResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phiên bản của bản ghi', example: 1 }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian tạo', example: '2023-01-01T12:00:00Z' }),
    __metadata("design:type", Date)
], DepartmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian cập nhật cuối cùng', example: '2023-01-01T12:00:00Z' }),
    __metadata("design:type", Date)
], DepartmentResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cấp độ trong cây phân cấp', example: 0 }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "hierarchyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Có phải khoa gốc không', example: true }),
    __metadata("design:type", Boolean)
], DepartmentResponseDto.prototype, "isRoot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Có khoa con không', example: false }),
    __metadata("design:type", Boolean)
], DepartmentResponseDto.prototype, "hasChildren", void 0);
//# sourceMappingURL=department-response.dto.js.map