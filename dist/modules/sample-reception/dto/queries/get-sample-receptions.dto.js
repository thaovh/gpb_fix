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
exports.GetSampleReceptionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GetSampleReceptionsDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = 'receptionDate';
        this.sortOrder = 'DESC';
    }
}
exports.GetSampleReceptionsDto = GetSampleReceptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số lượng bản ghi trên mỗi trang', example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetSampleReceptionsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số lượng bản ghi bỏ qua', example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GetSampleReceptionsDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Từ khóa tìm kiếm theo mã tiếp nhận hoặc tên loại mẫu', example: 'BLOOD' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetSampleReceptionsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trường để sắp xếp', example: 'receptionDate', enum: ['receptionCode', 'receptionDate', 'sequenceNumber', 'createdAt'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['receptionCode', 'receptionDate', 'sequenceNumber', 'createdAt']),
    __metadata("design:type", String)
], GetSampleReceptionsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Thứ tự sắp xếp', example: 'DESC', enum: ['ASC', 'DESC'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    __metadata("design:type", String)
], GetSampleReceptionsDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=get-sample-receptions.dto.js.map