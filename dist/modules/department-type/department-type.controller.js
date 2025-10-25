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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const department_type_service_1 = require("./department-type.service");
const create_department_type_dto_1 = require("./dto/commands/create-department-type.dto");
const update_department_type_dto_1 = require("./dto/commands/update-department-type.dto");
const get_department_types_dto_1 = require("./dto/queries/get-department-types.dto");
const search_department_types_dto_1 = require("./dto/queries/search-department-types.dto");
const department_type_response_dto_1 = require("./dto/responses/department-type-response.dto");
const department_types_list_response_dto_1 = require("./dto/responses/department-types-list-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let DepartmentTypeController = class DepartmentTypeController {
    constructor(departmentTypeService) {
        this.departmentTypeService = departmentTypeService;
    }
    async createDepartmentType(createDepartmentTypeDto, currentUser) {
        const id = await this.departmentTypeService.createDepartmentType(createDepartmentTypeDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ id }, 201);
    }
    async updateDepartmentType(id, updateDepartmentTypeDto, currentUser) {
        await this.departmentTypeService.updateDepartmentType(id, updateDepartmentTypeDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Department type updated successfully' });
    }
    async deleteDepartmentType(id, hardDelete) {
        const deleteDepartmentTypeDto = {
            id,
            hardDelete: hardDelete === 'true',
        };
        await this.departmentTypeService.deleteDepartmentType(deleteDepartmentTypeDto.id);
        return response_builder_1.ResponseBuilder.success({ message: 'Department type deleted successfully' });
    }
    async getDepartmentTypes(query) {
        const result = await this.departmentTypeService.getDepartmentTypes(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async searchDepartmentTypes(searchDepartmentTypesDto) {
        const result = await this.departmentTypeService.getDepartmentTypes({
            limit: searchDepartmentTypesDto.limit,
            offset: searchDepartmentTypesDto.offset,
            search: searchDepartmentTypesDto.keyword,
            isActive: searchDepartmentTypesDto.isActive,
            sortBy: searchDepartmentTypesDto.sortBy,
            sortOrder: searchDepartmentTypesDto.sortOrder,
        });
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentTypeById(id, includeDeleted) {
        const getDepartmentTypeByIdDto = {
            id,
            includeDeleted: includeDeleted === 'true',
        };
        const result = await this.departmentTypeService.getDepartmentTypeById(id);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentTypesStats() {
        const result = await this.departmentTypeService.getStatsOverview();
        return response_builder_1.ResponseBuilder.success(result);
    }
    async reorderDepartmentTypes() {
        await this.departmentTypeService.reorderDepartmentTypes([]);
        return response_builder_1.ResponseBuilder.success({ message: 'Department types reordered successfully' });
    }
    async getDepartmentTypesWithStats(query) {
        const result = await this.departmentTypeService.getDepartmentTypesWithStats(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
};
exports.DepartmentTypeController = DepartmentTypeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tạo loại khoa mới',
        description: 'Tạo một loại khoa mới trong hệ thống'
    }),
    (0, swagger_1.ApiBody)({ type: create_department_type_dto_1.CreateDepartmentTypeDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Loại khoa được tạo thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 201 },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã loại khoa đã tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_type_dto_1.CreateDepartmentTypeDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "createDepartmentType", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cập nhật loại khoa',
        description: 'Cập nhật thông tin loại khoa'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID loại khoa' }),
    (0, swagger_1.ApiBody)({ type: update_department_type_dto_1.UpdateDepartmentTypeDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Loại khoa được cập nhật thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Department type updated successfully' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy loại khoa' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_type_dto_1.UpdateDepartmentTypeDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "updateDepartmentType", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa loại khoa',
        description: 'Xóa loại khoa (soft delete)'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID loại khoa' }),
    (0, swagger_1.ApiQuery)({ name: 'hardDelete', description: 'Xóa vĩnh viễn', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Loại khoa được xóa thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Department type deleted successfully' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy loại khoa' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('hardDelete')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "deleteDepartmentType", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách loại khoa',
        description: 'Lấy danh sách loại khoa với phân trang và tìm kiếm'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách loại khoa được trả về thành công',
        type: department_types_list_response_dto_1.DepartmentTypesListResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Tham số truy vấn không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_department_types_dto_1.GetDepartmentTypesDto]),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "getDepartmentTypes", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tìm kiếm loại khoa',
        description: 'Tìm kiếm loại khoa theo từ khóa'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kết quả tìm kiếm được trả về thành công',
        type: department_types_list_response_dto_1.DepartmentTypesListResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Từ khóa tìm kiếm không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_department_types_dto_1.SearchDepartmentTypesDto]),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "searchDepartmentTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy chi tiết loại khoa',
        description: 'Lấy thông tin chi tiết của một loại khoa'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID loại khoa' }),
    (0, swagger_1.ApiQuery)({ name: 'includeDeleted', description: 'Bao gồm bản ghi đã xóa', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Chi tiết loại khoa được trả về thành công',
        type: department_type_response_dto_1.DepartmentTypeResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy loại khoa' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "getDepartmentTypeById", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thống kê tổng quan',
        description: 'Lấy thống kê tổng quan về số lượng loại khoa'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thống kê tổng quan được trả về thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        total: { type: 'number', example: 10 },
                        active: { type: 'number', example: 8 },
                        inactive: { type: 'number', example: 2 },
                        activePercentage: { type: 'number', example: 80 }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "getDepartmentTypesStats", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sắp xếp lại thứ tự loại khoa',
        description: 'Sắp xếp lại thứ tự hiển thị của các loại khoa'
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                departmentTypeIds: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['id1', 'id2', 'id3']
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thứ tự loại khoa được sắp xếp lại thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Department types reordered successfully' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "reorderDepartmentTypes", null);
__decorate([
    (0, common_1.Get)('with-stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách loại khoa với thống kê',
        description: 'Lấy danh sách loại khoa kèm theo thống kê (sử dụng DataLoader để tối ưu performance)'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách loại khoa với thống kê được trả về thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        departmentTypes: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440001' },
                                    typeCode: { type: 'string', example: 'KHOA' },
                                    typeName: { type: 'string', example: 'Khoa' },
                                    description: { type: 'string', example: 'Các khoa chuyên môn' },
                                    displayName: { type: 'string', example: 'KHOA - Khoa' },
                                    sortOrder: { type: 'number', example: 1 },
                                    isActive: { type: 'boolean', example: true },
                                }
                            }
                        },
                        total: { type: 'number', example: 10 },
                        limit: { type: 'number', example: 10 },
                        offset: { type: 'number', example: 0 }
                    }
                }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_department_types_dto_1.GetDepartmentTypesDto]),
    __metadata("design:returntype", Promise)
], DepartmentTypeController.prototype, "getDepartmentTypesWithStats", null);
exports.DepartmentTypeController = DepartmentTypeController = __decorate([
    (0, swagger_1.ApiTags)('Department Types'),
    (0, common_1.Controller)('department-types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [department_type_service_1.DepartmentTypeService])
], DepartmentTypeController);
//# sourceMappingURL=department-type.controller.js.map