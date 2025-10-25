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
exports.UpdateSampleTypeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateSampleTypeDto {
}
exports.UpdateSampleTypeDto = UpdateSampleTypeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mã loại mẫu', example: 'BLOOD' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateSampleTypeDto.prototype, "typeCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên loại mẫu', example: 'Mẫu máu' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateSampleTypeDto.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tên viết tắt', example: 'Máu' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateSampleTypeDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mô tả', example: 'Mẫu máu để xét nghiệm' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], UpdateSampleTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số thứ tự', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSampleTypeDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=update-sample-type.dto.js.map