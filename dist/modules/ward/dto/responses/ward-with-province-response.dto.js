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
exports.WardWithProvinceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ward_response_dto_1 = require("./ward-response.dto");
class WardWithProvinceResponseDto extends ward_response_dto_1.WardResponseDto {
}
exports.WardWithProvinceResponseDto = WardWithProvinceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin chi tiết tỉnh',
        example: {
            id: '550e8400-e29b-41d4-a716-446655440001',
            provinceCode: '01',
            provinceName: 'Hà Nội',
            shortName: 'HN',
            isActive: true,
            createdAt: '2024-01-15T10:30:00.000Z',
            updatedAt: '2024-01-15T10:30:00.000Z'
        }
    }),
    __metadata("design:type", Object)
], WardWithProvinceResponseDto.prototype, "province", void 0);
//# sourceMappingURL=ward-with-province-response.dto.js.map