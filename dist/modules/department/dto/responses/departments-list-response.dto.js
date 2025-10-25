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
exports.DepartmentsListResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const department_response_dto_1 = require("./department-response.dto");
class DepartmentsListResponseDto {
}
exports.DepartmentsListResponseDto = DepartmentsListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [department_response_dto_1.DepartmentResponseDto], description: 'Danh sách các khoa' }),
    __metadata("design:type", Array)
], DepartmentsListResponseDto.prototype, "departments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng số khoa', example: 100 }),
    __metadata("design:type", Number)
], DepartmentsListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số lượng khoa trên mỗi trang', example: 10 }),
    __metadata("design:type", Number)
], DepartmentsListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số lượng khoa đã bỏ qua', example: 0 }),
    __metadata("design:type", Number)
], DepartmentsListResponseDto.prototype, "offset", void 0);
//# sourceMappingURL=departments-list-response.dto.js.map