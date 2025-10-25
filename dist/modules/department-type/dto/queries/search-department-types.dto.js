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
exports.SearchDepartmentTypesDto = exports.SearchSortOrder = exports.SearchSortBy = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var SearchSortBy;
(function (SearchSortBy) {
    SearchSortBy["TYPE_CODE"] = "typeCode";
    SearchSortBy["TYPE_NAME"] = "typeName";
    SearchSortBy["SORT_ORDER"] = "sortOrder";
    SearchSortBy["CREATED_AT"] = "createdAt";
    SearchSortBy["UPDATED_AT"] = "updatedAt";
})(SearchSortBy || (exports.SearchSortBy = SearchSortBy = {}));
var SearchSortOrder;
(function (SearchSortOrder) {
    SearchSortOrder["ASC"] = "ASC";
    SearchSortOrder["DESC"] = "DESC";
})(SearchSortOrder || (exports.SearchSortOrder = SearchSortOrder = {}));
class SearchDepartmentTypesDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = SearchSortBy.TYPE_NAME;
        this.sortOrder = SearchSortOrder.ASC;
    }
}
exports.SearchDepartmentTypesDto = SearchDepartmentTypesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Từ khóa tìm kiếm',
        example: 'khoa',
        required: true,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], SearchDepartmentTypesDto.prototype, "keyword", void 0);
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
], SearchDepartmentTypesDto.prototype, "limit", void 0);
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
], SearchDepartmentTypesDto.prototype, "offset", void 0);
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
], SearchDepartmentTypesDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trường sắp xếp',
        example: SearchSortBy.TYPE_NAME,
        enum: SearchSortBy,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDepartmentTypesDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: SearchSortOrder.ASC,
        enum: SearchSortOrder,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDepartmentTypesDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=search-department-types.dto.js.map