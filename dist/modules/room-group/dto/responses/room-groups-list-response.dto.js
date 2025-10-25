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
exports.RoomGroupsListResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const room_group_response_dto_1 = require("./room-group-response.dto");
class RoomGroupsListResponseDto {
}
exports.RoomGroupsListResponseDto = RoomGroupsListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [room_group_response_dto_1.RoomGroupResponseDto], description: 'Danh sách các nhóm phòng' }),
    __metadata("design:type", Array)
], RoomGroupsListResponseDto.prototype, "roomGroups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng số nhóm phòng', example: 100 }),
    __metadata("design:type", Number)
], RoomGroupsListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số lượng nhóm phòng trên mỗi trang', example: 10 }),
    __metadata("design:type", Number)
], RoomGroupsListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số lượng nhóm phòng đã bỏ qua', example: 0 }),
    __metadata("design:type", Number)
], RoomGroupsListResponseDto.prototype, "offset", void 0);
//# sourceMappingURL=room-groups-list-response.dto.js.map