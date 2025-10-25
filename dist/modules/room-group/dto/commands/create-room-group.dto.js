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
exports.CreateRoomGroupDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateRoomGroupDto {
}
exports.CreateRoomGroupDto = CreateRoomGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã nhóm phòng (duy nhất)',
        example: 'VIP',
        minLength: 2,
        maxLength: 20,
    }),
    (0, class_validator_1.IsString)({ message: 'Mã nhóm phòng phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mã nhóm phòng không được để trống' }),
    (0, class_validator_1.Length)(2, 20, { message: 'Mã nhóm phòng phải từ 2 đến 20 ký tự' }),
    __metadata("design:type", String)
], CreateRoomGroupDto.prototype, "roomGroupCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên nhóm phòng',
        example: 'Phòng VIP',
        minLength: 2,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)({ message: 'Tên nhóm phòng phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên nhóm phòng không được để trống' }),
    (0, class_validator_1.Length)(2, 100, { message: 'Tên nhóm phòng phải từ 2 đến 100 ký tự' }),
    __metadata("design:type", String)
], CreateRoomGroupDto.prototype, "roomGroupName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: 1,
        required: false,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Thứ tự sắp xếp phải là số' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'Thứ tự sắp xếp không được nhỏ hơn 0' }),
    __metadata("design:type", Number)
], CreateRoomGroupDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=create-room-group.dto.js.map