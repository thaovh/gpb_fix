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
exports.RoomGroupResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RoomGroupResponseDto {
}
exports.RoomGroupResponseDto = RoomGroupResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của nhóm phòng', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' }),
    __metadata("design:type", String)
], RoomGroupResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã nhóm phòng', example: 'VIP' }),
    __metadata("design:type", String)
], RoomGroupResponseDto.prototype, "roomGroupCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên nhóm phòng', example: 'Phòng VIP' }),
    __metadata("design:type", String)
], RoomGroupResponseDto.prototype, "roomGroupName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên hiển thị của nhóm phòng', example: 'VIP - Phòng VIP' }),
    __metadata("design:type", String)
], RoomGroupResponseDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thứ tự sắp xếp', example: 1 }),
    __metadata("design:type", Number)
], RoomGroupResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái hoạt động', example: true }),
    __metadata("design:type", Boolean)
], RoomGroupResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phiên bản của bản ghi', example: 1 }),
    __metadata("design:type", Number)
], RoomGroupResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian tạo', example: '2023-01-01T12:00:00Z' }),
    __metadata("design:type", Date)
], RoomGroupResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian cập nhật cuối cùng', example: '2023-01-01T12:00:00Z' }),
    __metadata("design:type", Date)
], RoomGroupResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=room-group-response.dto.js.map