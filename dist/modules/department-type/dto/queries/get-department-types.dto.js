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
exports.GetDepartmentTypesDto = exports.DepartmentTypeSortOrder = exports.DepartmentTypeSortBy = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var DepartmentTypeSortBy;
(function (DepartmentTypeSortBy) {
    DepartmentTypeSortBy["TYPE_CODE"] = "typeCode";
    DepartmentTypeSortBy["TYPE_NAME"] = "typeName";
    DepartmentTypeSortBy["SORT_ORDER"] = "sortOrder";
    DepartmentTypeSortBy["CREATED_AT"] = "createdAt";
    DepartmentTypeSortBy["UPDATED_AT"] = "updatedAt";
})(DepartmentTypeSortBy || (exports.DepartmentTypeSortBy = DepartmentTypeSortBy = {}));
var DepartmentTypeSortOrder;
(function (DepartmentTypeSortOrder) {
    DepartmentTypeSortOrder["ASC"] = "ASC";
    DepartmentTypeSortOrder["DESC"] = "DESC";
})(DepartmentTypeSortOrder || (exports.DepartmentTypeSortOrder = DepartmentTypeSortOrder = {}));
class GetDepartmentTypesDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = DepartmentTypeSortBy.SORT_ORDER;
        this.sortOrder = DepartmentTypeSortOrder.ASC;
    }
}
exports.GetDepartmentTypesDto = GetDepartmentTypesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trên mỗi trang',
        example: 10,
        minimum: 1,
        maximum: 100,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], GetDepartmentTypesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vị trí bắt đầu',
        example: 0,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GetDepartmentTypesDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Từ khóa tìm kiếm',
        example: 'khoa',
        required: false,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], GetDepartmentTypesDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetDepartmentTypesDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trường sắp xếp',
        example: DepartmentTypeSortBy.SORT_ORDER,
        enum: DepartmentTypeSortBy,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDepartmentTypesDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: DepartmentTypeSortOrder.ASC,
        enum: DepartmentTypeSortOrder,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDepartmentTypesDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=get-department-types.dto.js.map