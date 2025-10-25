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
exports.RoomGroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const room_group_service_1 = require("./room-group.service");
const create_room_group_dto_1 = require("./dto/commands/create-room-group.dto");
const update_room_group_dto_1 = require("./dto/commands/update-room-group.dto");
const get_room_groups_dto_1 = require("./dto/queries/get-room-groups.dto");
const search_room_groups_dto_1 = require("./dto/queries/search-room-groups.dto");
const room_group_response_dto_1 = require("./dto/responses/room-group-response.dto");
const room_groups_list_response_dto_1 = require("./dto/responses/room-groups-list-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let RoomGroupController = class RoomGroupController {
    constructor(roomGroupService) {
        this.roomGroupService = roomGroupService;
    }
    async createRoomGroup(createDto, currentUser) {
        const id = await this.roomGroupService.createRoomGroup(createDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ id }, 201);
    }
    async updateRoomGroup(id, updateDto, currentUser) {
        await this.roomGroupService.updateRoomGroup(id, updateDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Room group updated successfully' });
    }
    async deleteRoomGroup(id, hardDelete) {
        await this.roomGroupService.deleteRoomGroup(id, hardDelete === 'true');
        return response_builder_1.ResponseBuilder.success({ message: 'Room group deleted successfully' });
    }
    async getRoomGroups(query) {
        const result = await this.roomGroupService.getRoomGroups(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async searchRoomGroups(query) {
        const result = await this.roomGroupService.searchRoomGroups(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getRoomGroupsWithStats(query) {
        const result = await this.roomGroupService.getRoomGroupsWithStats(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getStatsOverview() {
        const result = await this.roomGroupService.getStatsOverview();
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getRoomGroupById(id, includeDeleted) {
        const result = await this.roomGroupService.getRoomGroupById(id);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async reorderRoomGroups(roomGroupIds) {
        await this.roomGroupService.reorderRoomGroups(roomGroupIds);
        return response_builder_1.ResponseBuilder.success({ message: 'Thứ tự nhóm phòng được sắp xếp lại thành công' });
    }
};
exports.RoomGroupController = RoomGroupController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo nhóm phòng mới', description: 'Tạo một nhóm phòng mới với mã và tên.' }),
    (0, swagger_1.ApiBody)({ type: create_room_group_dto_1.CreateRoomGroupDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Nhóm phòng được tạo thành công',
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
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã nhóm phòng hoặc tên nhóm phòng đã tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_group_dto_1.CreateRoomGroupDto, Object]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "createRoomGroup", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật nhóm phòng', description: 'Cập nhật thông tin của một nhóm phòng hiện có.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của nhóm phòng cần cập nhật' }),
    (0, swagger_1.ApiBody)({ type: update_room_group_dto_1.UpdateRoomGroupDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nhóm phòng được cập nhật thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Room group updated successfully' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhóm phòng' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã nhóm phòng hoặc tên nhóm phòng đã tồn tại' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_group_dto_1.UpdateRoomGroupDto, Object]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "updateRoomGroup", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa nhóm phòng', description: 'Xóa mềm hoặc xóa cứng một nhóm phòng.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của nhóm phòng cần xóa' }),
    (0, swagger_1.ApiQuery)({ name: 'hardDelete', type: 'boolean', required: false, description: 'Xóa cứng khỏi DB nếu true (mặc định là xóa mềm)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nhóm phòng được xóa thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Room group deleted successfully' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhóm phòng' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('hardDelete')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "deleteRoomGroup", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách nhóm phòng', description: 'Lấy danh sách tất cả các nhóm phòng có phân trang, tìm kiếm và lọc.' }),
    (0, swagger_1.ApiQuery)({ type: get_room_groups_dto_1.GetRoomGroupsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách nhóm phòng được trả về thành công', type: room_groups_list_response_dto_1.RoomGroupsListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_room_groups_dto_1.GetRoomGroupsDto]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "getRoomGroups", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Tìm kiếm nhóm phòng', description: 'Tìm kiếm nhóm phòng theo từ khóa (mã, tên).' }),
    (0, swagger_1.ApiQuery)({ type: search_room_groups_dto_1.SearchRoomGroupsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kết quả tìm kiếm nhóm phòng được trả về thành công', type: room_groups_list_response_dto_1.RoomGroupsListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_room_groups_dto_1.SearchRoomGroupsDto]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "searchRoomGroups", null);
__decorate([
    (0, common_1.Get)('with-stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách nhóm phòng với thống kê', description: 'Lấy danh sách nhóm phòng kèm theo các thống kê liên quan (sử dụng DataLoader để tối ưu performance).' }),
    (0, swagger_1.ApiQuery)({ type: get_room_groups_dto_1.GetRoomGroupsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách nhóm phòng với thống kê được trả về thành công', type: room_groups_list_response_dto_1.RoomGroupsListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_room_groups_dto_1.GetRoomGroupsDto]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "getRoomGroupsWithStats", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê tổng quan nhóm phòng', description: 'Lấy thống kê tổng quan về số lượng nhóm phòng.' }),
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
], RoomGroupController.prototype, "getStatsOverview", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết nhóm phòng', description: 'Lấy thông tin chi tiết của một nhóm phòng bằng ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của nhóm phòng' }),
    (0, swagger_1.ApiQuery)({ name: 'includeDeleted', type: 'boolean', required: false, description: 'Bao gồm cả các bản ghi đã xóa mềm' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chi tiết nhóm phòng được trả về thành công', type: room_group_response_dto_1.RoomGroupResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhóm phòng' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "getRoomGroupById", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Sắp xếp lại thứ tự nhóm phòng', description: 'Sắp xếp lại thứ tự hiển thị của các nhóm phòng.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                roomGroupIds: {
                    type: 'array',
                    items: { type: 'string', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thứ tự nhóm phòng được sắp xếp lại thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Thứ tự nhóm phòng được sắp xếp lại thành công' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Body)('roomGroupIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoomGroupController.prototype, "reorderRoomGroups", null);
exports.RoomGroupController = RoomGroupController = __decorate([
    (0, swagger_1.ApiTags)('Room Groups'),
    (0, common_1.Controller)('room-groups'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [room_group_service_1.RoomGroupService])
], RoomGroupController);
//# sourceMappingURL=room-group.controller.js.map