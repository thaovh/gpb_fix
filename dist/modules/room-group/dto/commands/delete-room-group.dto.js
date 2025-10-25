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
exports.DeleteRoomGroupDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class DeleteRoomGroupDto {
}
exports.DeleteRoomGroupDto = DeleteRoomGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của nhóm phòng cần xóa',
        example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    }),
    (0, class_validator_1.IsString)({ message: 'ID phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID không được để trống' }),
    __metadata("design:type", String)
], DeleteRoomGroupDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Xóa cứng khỏi cơ sở dữ liệu (mặc định là xóa mềm)',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)({ message: 'hardDelete phải là boolean' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], DeleteRoomGroupDto.prototype, "hardDelete", void 0);
//# sourceMappingURL=delete-room-group.dto.js.map