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
exports.CreateRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRoomDto {
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã phòng (duy nhất)',
        example: 'P001',
        maxLength: 20,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên phòng',
        example: 'Phòng 101',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Địa chỉ phòng',
        example: 'Tầng 1, Khu A',
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 200),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID khoa',
        example: 'dept-001',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID nhóm phòng',
        example: 'group-001',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "roomGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mô tả phòng',
        example: 'Phòng khám nội tổng hợp',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trạng thái hoạt động',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateRoomDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Thứ tự sắp xếp',
        example: 1,
        minimum: 0,
        maximum: 9999,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(9999),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=create-room.dto.js.map