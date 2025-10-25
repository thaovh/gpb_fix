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
exports.GetProvincesDto = exports.ProvinceSortOrder = exports.ProvinceSortBy = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var ProvinceSortBy;
(function (ProvinceSortBy) {
    ProvinceSortBy["SORT_ORDER"] = "sortOrder";
    ProvinceSortBy["PROVINCE_NAME"] = "provinceName";
    ProvinceSortBy["PROVINCE_CODE"] = "provinceCode";
    ProvinceSortBy["CREATED_AT"] = "createdAt";
})(ProvinceSortBy || (exports.ProvinceSortBy = ProvinceSortBy = {}));
var ProvinceSortOrder;
(function (ProvinceSortOrder) {
    ProvinceSortOrder["ASC"] = "ASC";
    ProvinceSortOrder["DESC"] = "DESC";
})(ProvinceSortOrder || (exports.ProvinceSortOrder = ProvinceSortOrder = {}));
class GetProvincesDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = ProvinceSortBy.SORT_ORDER;
        this.sortOrder = ProvinceSortOrder.ASC;
    }
}
exports.GetProvincesDto = GetProvincesDto;
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
], GetProvincesDto.prototype, "limit", void 0);
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
], GetProvincesDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trường để sắp xếp',
        enum: ProvinceSortBy,
        example: ProvinceSortBy.SORT_ORDER,
        default: ProvinceSortBy.SORT_ORDER,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ProvinceSortBy),
    __metadata("design:type", String)
], GetProvincesDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        enum: ProvinceSortOrder,
        example: ProvinceSortOrder.ASC,
        default: ProvinceSortOrder.ASC,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ProvinceSortOrder),
    __metadata("design:type", String)
], GetProvincesDto.prototype, "sortOrder", void 0);
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
], GetProvincesDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tìm kiếm theo tên, mã hoặc tên viết tắt',
        example: 'Hà Nội',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProvincesDto.prototype, "search", void 0);
//# sourceMappingURL=get-provinces.dto.js.map