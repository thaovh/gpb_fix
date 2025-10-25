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
exports.SearchProvincesDto = exports.SearchSortOrder = exports.SearchSortBy = exports.SearchType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var SearchType;
(function (SearchType) {
    SearchType["NAME"] = "name";
    SearchType["CODE"] = "code";
    SearchType["SHORT_NAME"] = "shortName";
    SearchType["ALL"] = "all";
})(SearchType || (exports.SearchType = SearchType = {}));
var SearchSortBy;
(function (SearchSortBy) {
    SearchSortBy["SORT_ORDER"] = "sortOrder";
    SearchSortBy["PROVINCE_NAME"] = "provinceName";
    SearchSortBy["PROVINCE_CODE"] = "provinceCode";
    SearchSortBy["CREATED_AT"] = "createdAt";
})(SearchSortBy || (exports.SearchSortBy = SearchSortBy = {}));
var SearchSortOrder;
(function (SearchSortOrder) {
    SearchSortOrder["ASC"] = "ASC";
    SearchSortOrder["DESC"] = "DESC";
})(SearchSortOrder || (exports.SearchSortOrder = SearchSortOrder = {}));
class SearchProvincesDto {
    constructor() {
        this.searchType = SearchType.ALL;
        this.limit = 10;
        this.offset = 0;
        this.sortBy = SearchSortBy.SORT_ORDER;
        this.sortOrder = SearchSortOrder.ASC;
    }
}
exports.SearchProvincesDto = SearchProvincesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Từ khóa tìm kiếm',
        example: 'Hà Nội',
        minLength: 1,
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", String)
], SearchProvincesDto.prototype, "keyword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loại tìm kiếm',
        enum: SearchType,
        example: SearchType.ALL,
        default: SearchType.ALL,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SearchType),
    __metadata("design:type", String)
], SearchProvincesDto.prototype, "searchType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trả về',
        example: 10,
        minimum: 1,
        maximum: 100,
        default: 10,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], SearchProvincesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vị trí bắt đầu (offset)',
        example: 0,
        minimum: 0,
        default: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SearchProvincesDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trường để sắp xếp',
        enum: SearchSortBy,
        example: SearchSortBy.SORT_ORDER,
        default: SearchSortBy.SORT_ORDER,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SearchSortBy),
    __metadata("design:type", String)
], SearchProvincesDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        enum: SearchSortOrder,
        example: SearchSortOrder.ASC,
        default: SearchSortOrder.ASC,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SearchSortOrder),
    __metadata("design:type", String)
], SearchProvincesDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=search-provinces.dto.js.map