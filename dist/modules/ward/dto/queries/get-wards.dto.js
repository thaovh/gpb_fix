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
exports.GetWardsDto = exports.WardSortOrder = exports.WardSortBy = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var WardSortBy;
(function (WardSortBy) {
    WardSortBy["SORT_ORDER"] = "sortOrder";
    WardSortBy["WARD_NAME"] = "wardName";
    WardSortBy["WARD_CODE"] = "wardCode";
    WardSortBy["CREATED_AT"] = "createdAt";
})(WardSortBy || (exports.WardSortBy = WardSortBy = {}));
var WardSortOrder;
(function (WardSortOrder) {
    WardSortOrder["ASC"] = "ASC";
    WardSortOrder["DESC"] = "DESC";
})(WardSortOrder || (exports.WardSortOrder = WardSortOrder = {}));
class GetWardsDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = WardSortBy.SORT_ORDER;
        this.sortOrder = WardSortOrder.ASC;
    }
}
exports.GetWardsDto = GetWardsDto;
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
], GetWardsDto.prototype, "limit", void 0);
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
], GetWardsDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trường để sắp xếp',
        enum: WardSortBy,
        example: WardSortBy.SORT_ORDER,
        default: WardSortBy.SORT_ORDER,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(WardSortBy),
    __metadata("design:type", String)
], GetWardsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        enum: WardSortOrder,
        example: WardSortOrder.ASC,
        default: WardSortOrder.ASC,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(WardSortOrder),
    __metadata("design:type", String)
], GetWardsDto.prototype, "sortOrder", void 0);
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
], GetWardsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lọc theo ID tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetWardsDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tìm kiếm theo tên, mã hoặc tên viết tắt',
        example: 'Phúc Xá',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetWardsDto.prototype, "search", void 0);
//# sourceMappingURL=get-wards.dto.js.map