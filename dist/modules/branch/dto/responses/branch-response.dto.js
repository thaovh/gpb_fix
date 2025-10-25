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
exports.BranchResponseDto = exports.WardInfoDto = exports.ProvinceInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_branch_dto_1 = require("../commands/create-branch.dto");
class ProvinceInfoDto {
}
exports.ProvinceInfoDto = ProvinceInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã tỉnh',
        example: '01'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "provinceCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên tỉnh',
        example: 'Hà Nội'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "provinceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt của tỉnh',
        example: 'HN'
    }),
    __metadata("design:type", String)
], ProvinceInfoDto.prototype, "shortName", void 0);
class WardInfoDto {
}
exports.WardInfoDto = WardInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của xã',
        example: '550e8400-e29b-41d4-a716-446655440101'
    }),
    __metadata("design:type", String)
], WardInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã xã',
        example: '01001'
    }),
    __metadata("design:type", String)
], WardInfoDto.prototype, "wardCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên xã',
        example: 'Phường Phúc Xá'
    }),
    __metadata("design:type", String)
], WardInfoDto.prototype, "wardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt của xã',
        example: 'PX'
    }),
    __metadata("design:type", String)
], WardInfoDto.prototype, "shortName", void 0);
class BranchResponseDto {
}
exports.BranchResponseDto = BranchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID duy nhất của chi nhánh',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã chi nhánh',
        example: 'HN001'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "branchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên chi nhánh',
        example: 'Chi nhánh Hà Nội'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "branchName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt của chi nhánh',
        example: 'CN HN'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của xã',
        example: '550e8400-e29b-41d4-a716-446655440101'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "wardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ chi tiết',
        example: '123 Đường ABC, Phường XYZ'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số điện thoại',
        example: '0123456789'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cấp bệnh viện',
        enum: create_branch_dto_1.HospitalLevel,
        example: create_branch_dto_1.HospitalLevel.TUYEN_1
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "hospitalLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người đại diện',
        example: 'Nguyễn Văn A'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "representative", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã BHYT',
        example: '1234567890'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "bhyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true
    }),
    __metadata("design:type", Boolean)
], BranchResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày tạo',
        example: '2024-01-15T10:30:00.000Z'
    }),
    __metadata("design:type", Date)
], BranchResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày cập nhật cuối',
        example: '2024-01-15T10:30:00.000Z'
    }),
    __metadata("design:type", Date)
], BranchResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người tạo',
        example: 'admin',
        required: false
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người cập nhật cuối',
        example: 'admin',
        required: false
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phiên bản',
        example: 1
    }),
    __metadata("design:type", Number)
], BranchResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên hiển thị (Mã - Tên)',
        example: 'HN001 - Chi nhánh Hà Nội'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ đầy đủ',
        example: '123 Đường ABC, Phường XYZ, Hà Nội'
    }),
    __metadata("design:type", String)
], BranchResponseDto.prototype, "fullAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin tỉnh',
        type: ProvinceInfoDto,
        required: false
    }),
    __metadata("design:type", ProvinceInfoDto)
], BranchResponseDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin xã',
        type: WardInfoDto,
        required: false
    }),
    __metadata("design:type", WardInfoDto)
], BranchResponseDto.prototype, "ward", void 0);
//# sourceMappingURL=branch-response.dto.js.map