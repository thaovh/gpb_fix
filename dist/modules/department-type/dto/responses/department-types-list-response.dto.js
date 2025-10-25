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
exports.DepartmentTypesListResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const department_type_response_dto_1 = require("./department-type-response.dto");
class DepartmentTypesListResponseDto {
}
exports.DepartmentTypesListResponseDto = DepartmentTypesListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách loại khoa',
        type: [department_type_response_dto_1.DepartmentTypeResponseDto],
    }),
    __metadata("design:type", Array)
], DepartmentTypesListResponseDto.prototype, "departmentTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số bản ghi',
        example: 10,
    }),
    __metadata("design:type", Number)
], DepartmentTypesListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng bản ghi trên mỗi trang',
        example: 10,
    }),
    __metadata("design:type", Number)
], DepartmentTypesListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vị trí bắt đầu',
        example: 0,
    }),
    __metadata("design:type", Number)
], DepartmentTypesListResponseDto.prototype, "offset", void 0);
//# sourceMappingURL=department-types-list-response.dto.js.map