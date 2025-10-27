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
exports.GenerateCodeResponseDto = exports.CodeGenerationConfigDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CodeGenerationConfigDto {
}
exports.CodeGenerationConfigDto = CodeGenerationConfigDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiền tố mã tiếp nhận', example: 'BLOOD' }),
    __metadata("design:type", String)
], CodeGenerationConfigDto.prototype, "codePrefix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Độ rộng phần số', example: 4 }),
    __metadata("design:type", Number)
], CodeGenerationConfigDto.prototype, "codeWidth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cho phép mã trùng lặp', example: false }),
    __metadata("design:type", Boolean)
], CodeGenerationConfigDto.prototype, "allowDuplicate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chu kỳ reset số thứ tự', example: 'MONTHLY' }),
    __metadata("design:type", String)
], CodeGenerationConfigDto.prototype, "resetPeriod", void 0);
class GenerateCodeResponseDto {
}
exports.GenerateCodeResponseDto = GenerateCodeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã tiếp nhận được sinh', example: 'BLOOD202410.0001' }),
    __metadata("design:type", String)
], GenerateCodeResponseDto.prototype, "receptionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã loại mẫu', example: 'BLOOD' }),
    __metadata("design:type", String)
], GenerateCodeResponseDto.prototype, "sampleTypeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày sinh mã', example: '202410' }),
    __metadata("design:type", String)
], GenerateCodeResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số thứ tự tiếp theo', example: 1 }),
    __metadata("design:type", Number)
], GenerateCodeResponseDto.prototype, "nextSequence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cấu hình sinh mã', type: CodeGenerationConfigDto }),
    __metadata("design:type", CodeGenerationConfigDto)
], GenerateCodeResponseDto.prototype, "codeGenerationConfig", void 0);
//# sourceMappingURL=generate-code-response.dto.js.map