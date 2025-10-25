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
exports.GetRoomsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GetRoomsDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = 'sortOrder';
        this.sortOrder = 'ASC';
    }
}
exports.GetRoomsDto = GetRoomsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Số lượng bản ghi trả về',
        example: 10,
        minimum: 1,
        maximum: 100,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], GetRoomsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vị trí bắt đầu',
        example: 0,
        minimum: 0,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GetRoomsDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lọc theo trạng thái hoạt động',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetRoomsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lọc theo khoa',
        example: 'dept-001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetRoomsDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lọc theo nhóm phòng',
        example: 'group-001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetRoomsDto.prototype, "roomGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sắp xếp theo trường',
        example: 'sortOrder',
        enum: ['sortOrder', 'roomCode', 'roomName', 'createdAt', 'updatedAt'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetRoomsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Thứ tự sắp xếp',
        example: 'ASC',
        enum: ['ASC', 'DESC'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetRoomsDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=get-rooms.dto.js.map