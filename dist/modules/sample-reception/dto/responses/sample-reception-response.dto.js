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
exports.SampleReceptionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SampleReceptionResponseDto {
}
exports.SampleReceptionResponseDto = SampleReceptionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID tiếp nhận' }),
    __metadata("design:type", String)
], SampleReceptionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã tiếp nhận' }),
    __metadata("design:type", String)
], SampleReceptionResponseDto.prototype, "receptionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã loại mẫu' }),
    __metadata("design:type", String)
], SampleReceptionResponseDto.prototype, "sampleTypeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên loại mẫu' }),
    __metadata("design:type", String)
], SampleReceptionResponseDto.prototype, "sampleTypeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày tiếp nhận' }),
    __metadata("design:type", Date)
], SampleReceptionResponseDto.prototype, "receptionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số thứ tự' }),
    __metadata("design:type", Number)
], SampleReceptionResponseDto.prototype, "sequenceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày tạo' }),
    __metadata("design:type", Date)
], SampleReceptionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày cập nhật' }),
    __metadata("design:type", Date)
], SampleReceptionResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người tạo' }),
    __metadata("design:type", String)
], SampleReceptionResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Người cập nhật' }),
    __metadata("design:type", String)
], SampleReceptionResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phiên bản' }),
    __metadata("design:type", Number)
], SampleReceptionResponseDto.prototype, "version", void 0);
//# sourceMappingURL=sample-reception-response.dto.js.map