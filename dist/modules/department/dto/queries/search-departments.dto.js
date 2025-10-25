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
exports.SearchDepartmentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
const get_departments_dto_1 = require("./get-departments.dto");
const class_transformer_1 = require("class-transformer");
class SearchDepartmentsDto extends (0, swagger_1.PartialType)(get_departments_dto_1.GetDepartmentsDto) {
}
exports.SearchDepartmentsDto = SearchDepartmentsDto;
__decorate([
    (0, swagger_2.ApiProperty)({
        description: 'Từ khóa tìm kiếm (mã, tên, trưởng khoa, điều dưỡng trưởng)',
        example: 'tim mạch',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'Từ khóa tìm kiếm phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Từ khóa tìm kiếm không được để trống' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Từ khóa tìm kiếm phải từ 1 đến 100 ký tự' }),
    __metadata("design:type", String)
], SearchDepartmentsDto.prototype, "keyword", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: 'Lọc theo trạng thái hoạt động',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)({ message: 'Trạng thái hoạt động phải là boolean' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], SearchDepartmentsDto.prototype, "isActive", void 0);
//# sourceMappingURL=search-departments.dto.js.map