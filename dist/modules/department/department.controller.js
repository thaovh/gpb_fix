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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const department_service_1 = require("./department.service");
const create_department_dto_1 = require("./dto/commands/create-department.dto");
const update_department_dto_1 = require("./dto/commands/update-department.dto");
const get_departments_dto_1 = require("./dto/queries/get-departments.dto");
const search_departments_dto_1 = require("./dto/queries/search-departments.dto");
const department_response_dto_1 = require("./dto/responses/department-response.dto");
const departments_list_response_dto_1 = require("./dto/responses/departments-list-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async createDepartment(createDto, currentUser) {
        const id = await this.departmentService.createDepartment(createDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ id }, 201);
    }
    async updateDepartment(id, updateDto, currentUser) {
        await this.departmentService.updateDepartment(id, updateDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Department updated successfully' });
    }
    async deleteDepartment(id, hardDelete) {
        await this.departmentService.deleteDepartment(id, hardDelete === 'true');
        return response_builder_1.ResponseBuilder.success({ message: 'Department deleted successfully' });
    }
    async getDepartments(query) {
        const result = await this.departmentService.getDepartments(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async searchDepartments(query) {
        const result = await this.departmentService.searchDepartments(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentsByBranch(branchId) {
        const result = await this.departmentService.getDepartmentsByBranch(branchId);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentsByType(typeId) {
        const result = await this.departmentService.getDepartmentsByType(typeId);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentHierarchy() {
        const result = await this.departmentService.getDepartmentHierarchy();
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentChildren(id) {
        const result = await this.departmentService.getDepartmentChildren(id);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentsWithStats(query) {
        const result = await this.departmentService.getDepartmentsWithStats(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getDepartmentById(id, includeDeleted) {
        const result = await this.departmentService.getDepartmentById(id);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getStatsOverview() {
        const result = await this.departmentService.getStatsOverview();
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getStatsByBranch(branchId) {
        const result = await this.departmentService.getStatsByBranch(branchId);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getStatsByType(typeId) {
        const result = await this.departmentService.getStatsByType(typeId);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async reorderDepartments(departmentIds) {
        await this.departmentService.reorderDepartments(departmentIds);
        return response_builder_1.ResponseBuilder.success({ message: 'Thứ tự khoa được sắp xếp lại thành công' });
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo khoa mới', description: 'Tạo một khoa mới với mã, tên và các thông tin liên quan.' }),
    (0, swagger_1.ApiBody)({ type: create_department_dto_1.CreateDepartmentDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Khoa được tạo thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 201 },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã khoa đã tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật khoa', description: 'Cập nhật thông tin của một khoa hiện có.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của khoa cần cập nhật' }),
    (0, swagger_1.ApiBody)({ type: update_department_dto_1.UpdateDepartmentDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Khoa được cập nhật thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Department updated successfully' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoa' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã khoa hoặc tên khoa đã tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa khoa', description: 'Xóa mềm hoặc xóa cứng một khoa.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của khoa cần xóa' }),
    (0, swagger_1.ApiQuery)({ name: 'hardDelete', type: 'boolean', required: false, description: 'Xóa cứng khỏi DB nếu true (mặc định là xóa mềm)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Khoa được xóa thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Department deleted successfully' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoa' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Không thể xóa khoa có khoa con' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('hardDelete')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "deleteDepartment", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách khoa', description: 'Lấy danh sách tất cả các khoa có phân trang, tìm kiếm và lọc.' }),
    (0, swagger_1.ApiQuery)({ type: get_departments_dto_1.GetDepartmentsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách khoa được trả về thành công', type: departments_list_response_dto_1.DepartmentsListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_departments_dto_1.GetDepartmentsDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm khoa', description: 'Tìm kiếm khoa theo từ khóa (mã, tên, trưởng khoa, điều dưỡng trưởng).' }),
    (0, swagger_1.ApiQuery)({ type: search_departments_dto_1.SearchDepartmentsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kết quả tìm kiếm khoa được trả về thành công', type: departments_list_response_dto_1.DepartmentsListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_departments_dto_1.SearchDepartmentsDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "searchDepartments", null);
__decorate([
    (0, common_1.Get)('by-branch/:branchId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy khoa theo chi nhánh', description: 'Lấy danh sách khoa của một chi nhánh cụ thể.' }),
    (0, swagger_1.ApiParam)({ name: 'branchId', description: 'ID của chi nhánh' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách khoa theo chi nhánh được trả về thành công', type: [department_response_dto_1.DepartmentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentsByBranch", null);
__decorate([
    (0, common_1.Get)('by-type/:typeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy khoa theo loại khoa', description: 'Lấy danh sách khoa của một loại khoa cụ thể.' }),
    (0, swagger_1.ApiParam)({ name: 'typeId', description: 'ID của loại khoa' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách khoa theo loại khoa được trả về thành công', type: [department_response_dto_1.DepartmentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentsByType", null);
__decorate([
    (0, common_1.Get)('hierarchy'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cây phân cấp khoa', description: 'Lấy danh sách các khoa gốc (không có khoa cha) để xây dựng cây phân cấp.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cây phân cấp khoa được trả về thành công', type: [department_response_dto_1.DepartmentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentHierarchy", null);
__decorate([
    (0, common_1.Get)(':id/children'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy khoa con', description: 'Lấy danh sách khoa con của một khoa cụ thể.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của khoa cha' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách khoa con được trả về thành công', type: [department_response_dto_1.DepartmentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoa' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentChildren", null);
__decorate([
    (0, common_1.Get)('with-stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách khoa với thống kê', description: 'Lấy danh sách khoa kèm theo các thống kê liên quan (sử dụng DataLoader để tối ưu performance).' }),
    (0, swagger_1.ApiQuery)({ type: get_departments_dto_1.GetDepartmentsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách khoa với thống kê được trả về thành công', type: departments_list_response_dto_1.DepartmentsListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_departments_dto_1.GetDepartmentsDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentsWithStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết khoa', description: 'Lấy thông tin chi tiết của một khoa bằng ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của khoa' }),
    (0, swagger_1.ApiQuery)({ name: 'includeDeleted', type: 'boolean', required: false, description: 'Bao gồm cả các bản ghi đã xóa mềm' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chi tiết khoa được trả về thành công', type: department_response_dto_1.DepartmentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy khoa' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentById", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê tổng quan khoa', description: 'Lấy thống kê tổng quan về số lượng khoa.' }),
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
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getStatsOverview", null);
__decorate([
    (0, common_1.Get)('stats/by-branch/:branchId'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê khoa theo chi nhánh', description: 'Lấy thống kê khoa của một chi nhánh cụ thể.' }),
    (0, swagger_1.ApiParam)({ name: 'branchId', description: 'ID của chi nhánh' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thống kê khoa theo chi nhánh được trả về thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        branchId: { type: 'string', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
                        total: { type: 'number', example: 5 },
                        active: { type: 'number', example: 4 },
                        inactive: { type: 'number', example: 1 },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getStatsByBranch", null);
__decorate([
    (0, common_1.Get)('stats/by-type/:typeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê khoa theo loại khoa', description: 'Lấy thống kê khoa của một loại khoa cụ thể.' }),
    (0, swagger_1.ApiParam)({ name: 'typeId', description: 'ID của loại khoa' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thống kê khoa theo loại khoa được trả về thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        departmentTypeId: { type: 'string', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
                        total: { type: 'number', example: 3 },
                        active: { type: 'number', example: 3 },
                        inactive: { type: 'number', example: 0 },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getStatsByType", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Sắp xếp lại thứ tự khoa', description: 'Sắp xếp lại thứ tự hiển thị của các khoa.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                departmentIds: {
                    type: 'array',
                    items: { type: 'string', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thứ tự khoa được sắp xếp lại thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Thứ tự khoa được sắp xếp lại thành công' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Body)('departmentIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "reorderDepartments", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, swagger_1.ApiTags)('Departments'),
    (0, common_1.Controller)('departments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
//# sourceMappingURL=department.controller.js.map