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
exports.BranchWithLocationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const branch_response_dto_1 = require("./branch-response.dto");
class BranchWithLocationResponseDto extends branch_response_dto_1.BranchResponseDto {
}
exports.BranchWithLocationResponseDto = BranchWithLocationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin tỉnh đầy đủ',
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
], BranchWithLocationResponseDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin xã đầy đủ',
        example: {
            id: '550e8400-e29b-41d4-a716-446655440101',
            wardCode: '01001',
            wardName: 'Phường Phúc Xá',
            shortName: 'PX',
            provinceId: '550e8400-e29b-41d4-a716-446655440001',
            isActive: true,
            createdAt: '2024-01-15T10:30:00.000Z',
            updatedAt: '2024-01-15T10:30:00.000Z'
        }
    }),
    __metadata("design:type", Object)
], BranchWithLocationResponseDto.prototype, "ward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ đầy đủ với thông tin tỉnh và xã',
        example: '123 Đường ABC, Phường Phúc Xá, Hà Nội'
    }),
    __metadata("design:type", String)
], BranchWithLocationResponseDto.prototype, "fullAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin vị trí địa lý',
        example: {
            province: 'Hà Nội',
            ward: 'Phường Phúc Xá',
            address: '123 Đường ABC',
            fullAddress: '123 Đường ABC, Phường Phúc Xá, Hà Nội'
        }
    }),
    __metadata("design:type", Object)
], BranchWithLocationResponseDto.prototype, "location", void 0);
//# sourceMappingURL=branch-with-location-response.dto.js.map