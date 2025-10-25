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
exports.UpdateDepartmentTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateDepartmentTypeDto {
}
exports.UpdateDepartmentTypeDto = UpdateDepartmentTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên loại khoa',
        example: 'Khoa',
        minLength: 2,
        maxLength: 100,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], UpdateDepartmentTypeDto.prototype, "typeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả loại khoa',
        example: 'Các khoa chuyên môn trong bệnh viện',
        required: false,
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 500),
    __metadata("design:type", String)
], UpdateDepartmentTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        example: 1,
        minimum: 0,
        maximum: 9999,
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(9999),
    __metadata("design:type", Number)
], UpdateDepartmentTypeDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateDepartmentTypeDto.prototype, "isActive", void 0);
//# sourceMappingURL=update-department-type.dto.js.map