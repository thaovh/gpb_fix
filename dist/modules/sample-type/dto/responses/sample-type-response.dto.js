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
exports.SampleTypeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SampleTypeResponseDto {
}
exports.SampleTypeResponseDto = SampleTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID loại mẫu' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã loại mẫu' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "typeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên loại mẫu' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên viết tắt' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số thứ tự' }),
    __metadata("design:type", Number)
], SampleTypeResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiền tố mã tiếp nhận' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "codePrefix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Độ rộng phần số' }),
    __metadata("design:type", Number)
], SampleTypeResponseDto.prototype, "codeWidth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cho phép mã trùng lặp' }),
    __metadata("design:type", Boolean)
], SampleTypeResponseDto.prototype, "allowDuplicate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chu kỳ reset số thứ tự' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "resetPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên hiển thị' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thông tin sinh mã' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "codeGenerationInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày tạo' }),
    __metadata("design:type", Date)
], SampleTypeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày cập nhật' }),
    __metadata("design:type", Date)
], SampleTypeResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người tạo' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người cập nhật' }),
    __metadata("design:type", String)
], SampleTypeResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phiên bản' }),
    __metadata("design:type", Number)
], SampleTypeResponseDto.prototype, "version", void 0);
//# sourceMappingURL=sample-type-response.dto.js.map