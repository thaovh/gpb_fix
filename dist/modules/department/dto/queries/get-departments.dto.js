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
exports.GetDepartmentsDto = exports.DepartmentSortOrder = exports.DepartmentSortBy = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var DepartmentSortBy;
(function (DepartmentSortBy) {
    DepartmentSortBy["DEPARTMENT_CODE"] = "departmentCode";
    DepartmentSortBy["DEPARTMENT_NAME"] = "departmentName";
    DepartmentSortBy["SORT_ORDER"] = "sortOrder";
    DepartmentSortBy["CREATED_AT"] = "createdAt";
    DepartmentSortBy["UPDATED_AT"] = "updatedAt";
})(DepartmentSortBy || (exports.DepartmentSortBy = DepartmentSortBy = {}));
var DepartmentSortOrder;
(function (DepartmentSortOrder) {
    DepartmentSortOrder["ASC"] = "ASC";
    DepartmentSortOrder["DESC"] = "DESC";
})(DepartmentSortOrder || (exports.DepartmentSortOrder = DepartmentSortOrder = {}));
class GetDepartmentsDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = DepartmentSortBy.SORT_ORDER;
        this.sortOrder = DepartmentSortOrder.ASC;
    }
}
exports.GetDepartmentsDto = GetDepartmentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trên mỗi trang',
        example: 10,
        required: false,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Giới hạn phải là số' }),
    (0, class_validator_1.Min)(1, { message: 'Giới hạn phải lớn hơn hoặc bằng 1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetDepartmentsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi bỏ qua (offset)',
        example: 0,
        required: false,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Offset phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Offset phải lớn hơn hoặc bằng 0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetDepartmentsDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Từ khóa tìm kiếm (mã, tên, trưởng khoa, điều dưỡng trưởng)',
        example: 'tim mạch',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'Từ khóa tìm kiếm phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetDepartmentsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lọc theo trạng thái hoạt động',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)({ message: 'Trạng thái hoạt động phải là boolean' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetDepartmentsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lọc theo ID chi nhánh',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'ID chi nhánh phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID chi nhánh phải là UUID hợp lệ' }),
    __metadata("design:type", String)
], GetDepartmentsDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lọc theo ID loại khoa',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'ID loại khoa phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID loại khoa phải là UUID hợp lệ' }),
    __metadata("design:type", String)
], GetDepartmentsDto.prototype, "departmentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lọc theo ID khoa cha (null = khoa gốc)',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'ID khoa cha phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID khoa cha phải là UUID hợp lệ' }),
    __metadata("design:type", String)
], GetDepartmentsDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sắp xếp theo trường',
        enum: DepartmentSortBy,
        example: DepartmentSortBy.SORT_ORDER,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(DepartmentSortBy, { message: 'Trường sắp xếp không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetDepartmentsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        enum: DepartmentSortOrder,
        example: DepartmentSortOrder.ASC,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(DepartmentSortOrder, { message: 'Thứ tự sắp xếp không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetDepartmentsDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=get-departments.dto.js.map