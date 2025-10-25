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
exports.CreateBranchDto = exports.HospitalLevel = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var HospitalLevel;
(function (HospitalLevel) {
    HospitalLevel["TUYEN_1"] = "Tuy\u1EBFn 1";
    HospitalLevel["TUYEN_2"] = "Tuy\u1EBFn 2";
    HospitalLevel["TUYEN_3"] = "Tuy\u1EBFn 3";
    HospitalLevel["TUYEN_4"] = "Tuy\u1EBFn 4";
})(HospitalLevel || (exports.HospitalLevel = HospitalLevel = {}));
class CreateBranchDto {
    constructor() {
        this.isActive = true;
    }
}
exports.CreateBranchDto = CreateBranchDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã chi nhánh (tự động tạo nếu không cung cấp)',
        example: 'HN001',
        minLength: 5,
        maxLength: 10,
        pattern: '^[A-Z]{2,3}[0-9]{3}$',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.Matches)(/^[A-Z]{2,3}[0-9]{3}$/, { message: 'Mã chi nhánh phải có định dạng: 2-3 chữ cái + 3 chữ số (VD: HN001, HCM001)' }),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "branchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên chi nhánh',
        example: 'Chi nhánh Hà Nội',
        minLength: 2,
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "branchName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên viết tắt của chi nhánh',
        example: 'CN HN',
        minLength: 2,
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001',
        format: 'uuid'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của xã',
        example: '550e8400-e29b-41d4-a716-446655440101',
        format: 'uuid'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "wardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ chi tiết',
        example: '123 Đường ABC, Phường XYZ',
        minLength: 10,
        maxLength: 500
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số điện thoại',
        example: '0123456789',
        minLength: 10,
        maxLength: 15,
        pattern: '^(\+84|84|0)[1-9][0-9]{8,9}$'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.Matches)(/^(\+84|84|0)[1-9][0-9]{8,9}$/, { message: 'Số điện thoại không hợp lệ' }),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cấp bệnh viện',
        enum: HospitalLevel,
        example: HospitalLevel.TUYEN_1
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(HospitalLevel),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "hospitalLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Người đại diện',
        example: 'Nguyễn Văn A',
        minLength: 2,
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "representative", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã BHYT',
        example: '1234567890',
        minLength: 10,
        maxLength: 15,
        pattern: '^[0-9]{10,15}$'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.Matches)(/^[0-9]{10,15}$/, { message: 'Mã BHYT phải là 10-15 chữ số' }),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "bhyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true,
        default: true,
        required: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateBranchDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-branch.dto.js.map