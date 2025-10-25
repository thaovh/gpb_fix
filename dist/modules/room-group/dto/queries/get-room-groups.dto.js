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
exports.GetRoomGroupsDto = exports.RoomGroupSortOrder = exports.RoomGroupSortBy = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var RoomGroupSortBy;
(function (RoomGroupSortBy) {
    RoomGroupSortBy["ROOM_GROUP_CODE"] = "roomGroupCode";
    RoomGroupSortBy["ROOM_GROUP_NAME"] = "roomGroupName";
    RoomGroupSortBy["SORT_ORDER"] = "sortOrder";
    RoomGroupSortBy["CREATED_AT"] = "createdAt";
    RoomGroupSortBy["UPDATED_AT"] = "updatedAt";
})(RoomGroupSortBy || (exports.RoomGroupSortBy = RoomGroupSortBy = {}));
var RoomGroupSortOrder;
(function (RoomGroupSortOrder) {
    RoomGroupSortOrder["ASC"] = "ASC";
    RoomGroupSortOrder["DESC"] = "DESC";
})(RoomGroupSortOrder || (exports.RoomGroupSortOrder = RoomGroupSortOrder = {}));
class GetRoomGroupsDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = RoomGroupSortBy.SORT_ORDER;
        this.sortOrder = RoomGroupSortOrder.ASC;
    }
}
exports.GetRoomGroupsDto = GetRoomGroupsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trên mỗi trang',
        example: 10,
        required: false,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Giới hạn phải là số' }),
    (0, class_validator_1.Min)(1, { message: 'Giới hạn phải lớn hơn hoặc bằng 1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetRoomGroupsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi bỏ qua (offset)',
        example: 0,
        required: false,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Offset phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Offset phải lớn hơn hoặc bằng 0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetRoomGroupsDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Từ khóa tìm kiếm (mã, tên nhóm phòng)',
        example: 'vip',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'Từ khóa tìm kiếm phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetRoomGroupsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lọc theo trạng thái hoạt động',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)({ message: 'Trạng thái hoạt động phải là boolean' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetRoomGroupsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sắp xếp theo trường',
        enum: RoomGroupSortBy,
        example: RoomGroupSortBy.SORT_ORDER,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(RoomGroupSortBy, { message: 'Trường sắp xếp không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetRoomGroupsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        enum: RoomGroupSortOrder,
        example: RoomGroupSortOrder.ASC,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(RoomGroupSortOrder, { message: 'Thứ tự sắp xếp không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetRoomGroupsDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=get-room-groups.dto.js.map