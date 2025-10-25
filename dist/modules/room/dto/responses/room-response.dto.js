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
exports.RoomResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RoomResponseDto {
}
exports.RoomResponseDto = RoomResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID phòng',
        example: 'room-001',
    }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã phòng',
        example: 'P001',
    }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "roomCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên phòng',
        example: 'Phòng 101',
    }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Địa chỉ phòng',
        example: 'Tầng 1, Khu A',
    }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "roomAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID khoa',
        example: 'dept-001',
    }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID nhóm phòng',
        example: 'group-001',
    }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "roomGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mô tả phòng',
        example: 'Phòng khám nội tổng hợp',
    }),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true,
    }),
    __metadata("design:type", Boolean)
], RoomResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: 1,
    }),
    __metadata("design:type", Number)
], RoomResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày tạo',
        example: '2024-01-15T10:30:00Z',
    }),
    __metadata("design:type", Date)
], RoomResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày cập nhật',
        example: '2024-01-15T10:30:00Z',
    }),
    __metadata("design:type", Date)
], RoomResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Thông tin khoa',
    }),
    __metadata("design:type", Object)
], RoomResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Thông tin nhóm phòng',
    }),
    __metadata("design:type", Object)
], RoomResponseDto.prototype, "roomGroup", void 0);
//# sourceMappingURL=room-response.dto.js.map