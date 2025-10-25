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
exports.RoomsListResponseDto = exports.RoomPaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const room_response_dto_1 = require("./room-response.dto");
class RoomPaginationDto {
}
exports.RoomPaginationDto = RoomPaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số bản ghi',
        example: 100,
    }),
    __metadata("design:type", Number)
], RoomPaginationDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trả về',
        example: 10,
    }),
    __metadata("design:type", Number)
], RoomPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vị trí bắt đầu',
        example: 0,
    }),
    __metadata("design:type", Number)
], RoomPaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang tiếp theo',
        example: true,
    }),
    __metadata("design:type", Boolean)
], RoomPaginationDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Có trang trước',
        example: false,
    }),
    __metadata("design:type", Boolean)
], RoomPaginationDto.prototype, "hasPrev", void 0);
class RoomsListResponseDto {
}
exports.RoomsListResponseDto = RoomsListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách phòng',
        type: [room_response_dto_1.RoomResponseDto],
    }),
    __metadata("design:type", Array)
], RoomsListResponseDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin phân trang',
        type: RoomPaginationDto,
    }),
    __metadata("design:type", RoomPaginationDto)
], RoomsListResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=rooms-list-response.dto.js.map