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
exports.GetWardsByProvinceDto = exports.ProvinceWardSortOrder = exports.ProvinceWardSortBy = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var ProvinceWardSortBy;
(function (ProvinceWardSortBy) {
    ProvinceWardSortBy["SORT_ORDER"] = "sortOrder";
    ProvinceWardSortBy["WARD_NAME"] = "wardName";
    ProvinceWardSortBy["WARD_CODE"] = "wardCode";
    ProvinceWardSortBy["CREATED_AT"] = "createdAt";
})(ProvinceWardSortBy || (exports.ProvinceWardSortBy = ProvinceWardSortBy = {}));
var ProvinceWardSortOrder;
(function (ProvinceWardSortOrder) {
    ProvinceWardSortOrder["ASC"] = "ASC";
    ProvinceWardSortOrder["DESC"] = "DESC";
})(ProvinceWardSortOrder || (exports.ProvinceWardSortOrder = ProvinceWardSortOrder = {}));
class GetWardsByProvinceDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = ProvinceWardSortBy.SORT_ORDER;
        this.sortOrder = ProvinceWardSortOrder.ASC;
    }
}
exports.GetWardsByProvinceDto = GetWardsByProvinceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetWardsByProvinceDto.prototype, "provinceId", void 0);
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
], GetWardsByProvinceDto.prototype, "limit", void 0);
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
], GetWardsByProvinceDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trường để sắp xếp',
        enum: ProvinceWardSortBy,
        example: ProvinceWardSortBy.SORT_ORDER,
        default: ProvinceWardSortBy.SORT_ORDER,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ProvinceWardSortBy),
    __metadata("design:type", String)
], GetWardsByProvinceDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        enum: ProvinceWardSortOrder,
        example: ProvinceWardSortOrder.ASC,
        default: ProvinceWardSortOrder.ASC,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ProvinceWardSortOrder),
    __metadata("design:type", String)
], GetWardsByProvinceDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lọc theo trạng thái hoạt động',
        example: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetWardsByProvinceDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tìm kiếm theo tên, mã hoặc tên viết tắt',
        example: 'Phúc Xá',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetWardsByProvinceDto.prototype, "search", void 0);
//# sourceMappingURL=get-wards-by-province.dto.js.map