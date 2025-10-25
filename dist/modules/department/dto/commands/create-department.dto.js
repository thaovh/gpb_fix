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
exports.CreateDepartmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDepartmentDto {
}
exports.CreateDepartmentDto = CreateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã khoa (duy nhất)',
        example: 'KTM',
        minLength: 2,
        maxLength: 20,
    }),
    (0, class_validator_1.IsString)({ message: 'Mã khoa phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mã khoa không được để trống' }),
    (0, class_validator_1.Length)(2, 20, { message: 'Mã khoa phải từ 2 đến 20 ký tự' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên khoa',
        example: 'Khoa Tim Mạch',
        minLength: 2,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)({ message: 'Tên khoa phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên khoa không được để trống' }),
    (0, class_validator_1.Length)(2, 100, { message: 'Tên khoa phải từ 2 đến 100 ký tự' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID chi nhánh',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    }),
    (0, class_validator_1.IsString)({ message: 'ID chi nhánh phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID chi nhánh không được để trống' }),
    (0, class_validator_1.IsUUID)('4', { message: 'ID chi nhánh phải là UUID hợp lệ' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trưởng khoa',
        example: 'BS. Nguyễn Văn A',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)({ message: 'Trưởng khoa phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: 'Trưởng khoa không được vượt quá 100 ký tự' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "headOfDepartment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Điều dưỡng trưởng',
        example: 'ĐD. Trần Thị B',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)({ message: 'Điều dưỡng trưởng phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: 'Điều dưỡng trưởng không được vượt quá 100 ký tự' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "headNurse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID khoa cha (để tạo cấu trúc phân cấp)',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'ID khoa cha phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID khoa cha phải là UUID hợp lệ' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt',
        example: 'KTM',
        required: false,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)({ message: 'Tên viết tắt phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 50, { message: 'Tên viết tắt không được vượt quá 50 ký tự' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID loại khoa',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    }),
    (0, class_validator_1.IsString)({ message: 'ID loại khoa phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID loại khoa không được để trống' }),
    (0, class_validator_1.IsUUID)('4', { message: 'ID loại khoa phải là UUID hợp lệ' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "departmentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: 1,
        required: false,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Thứ tự sắp xếp phải là số' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'Thứ tự sắp xếp không được nhỏ hơn 0' }),
    __metadata("design:type", Number)
], CreateDepartmentDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=create-department.dto.js.map