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
exports.SampleTypesListResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sample_type_response_dto_1 = require("./sample-type-response.dto");
class SampleTypesListResponseDto {
}
exports.SampleTypesListResponseDto = SampleTypesListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách loại mẫu', type: [sample_type_response_dto_1.SampleTypeResponseDto] }),
    __metadata("design:type", Array)
], SampleTypesListResponseDto.prototype, "sampleTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng số bản ghi' }),
    __metadata("design:type", Number)
], SampleTypesListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số lượng bản ghi trên trang' }),
    __metadata("design:type", Number)
], SampleTypesListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vị trí bắt đầu' }),
    __metadata("design:type", Number)
], SampleTypesListResponseDto.prototype, "offset", void 0);
//# sourceMappingURL=sample-types-list-response.dto.js.map