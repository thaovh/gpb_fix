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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const room_service_1 = require("./room.service");
const create_room_dto_1 = require("./dto/commands/create-room.dto");
const update_room_dto_1 = require("./dto/commands/update-room.dto");
const get_rooms_dto_1 = require("./dto/queries/get-rooms.dto");
const search_rooms_dto_1 = require("./dto/queries/search-rooms.dto");
const room_response_dto_1 = require("./dto/responses/room-response.dto");
const rooms_list_response_dto_1 = require("./dto/responses/rooms-list-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async createRoom(createRoomDto, currentUser) {
        const roomId = await this.roomService.createRoom(createRoomDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ id: roomId }, common_1.HttpStatus.CREATED);
    }
    async updateRoom(id, updateRoomDto, currentUser) {
        await this.roomService.updateRoom(id, updateRoomDto, currentUser);
        return response_builder_1.ResponseBuilder.success({ message: 'Room updated successfully' });
    }
    async deleteRoom(id, currentUser) {
        await this.roomService.deleteRoom(id, currentUser);
        return response_builder_1.ResponseBuilder.success(null, common_1.HttpStatus.NO_CONTENT);
    }
    async getRooms(query) {
        const result = await this.roomService.getRooms(query);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async searchRooms(searchDto) {
        const result = await this.roomService.searchRooms(searchDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getRoomsByDepartment(departmentId, query) {
        const result = await this.roomService.getRoomsByDepartment({ departmentId, ...query });
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getRoomsByGroup(roomGroupId, query) {
        const result = await this.roomService.getRoomsByGroup({ roomGroupId, ...query });
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getRoomStats() {
        const stats = await this.roomService.getRoomStats();
        return response_builder_1.ResponseBuilder.success(stats);
    }
    async getRoomById(id) {
        const room = await this.roomService.getRoomById(id);
        return response_builder_1.ResponseBuilder.success(room);
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Tạo phòng mới',
        description: 'Tạo một phòng mới với mã, tên và các thông tin khác.'
    }),
    (0, swagger_1.ApiBody)({ type: create_room_dto_1.CreateRoomDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Phòng được tạo thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 201 },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'room-001' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Mã phòng hoặc tên phòng đã tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cập nhật phòng',
        description: 'Cập nhật thông tin của một phòng hiện có.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của phòng cần cập nhật' }),
    (0, swagger_1.ApiBody)({ type: update_room_dto_1.UpdateRoomDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Phòng được cập nhật thành công',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Room updated successfully' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy phòng' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Tên phòng đã tồn tại trong khoa' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Xóa phòng',
        description: 'Xóa mềm một phòng khỏi hệ thống.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của phòng cần xóa' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Phòng được xóa thành công' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy phòng' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách phòng',
        description: 'Lấy danh sách phòng với phân trang và bộ lọc.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Số lượng bản ghi trả về', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Vị trí bắt đầu', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: 'Lọc theo trạng thái hoạt động', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'departmentId', required: false, description: 'Lọc theo khoa', example: 'dept-001' }),
    (0, swagger_1.ApiQuery)({ name: 'roomGroupId', required: false, description: 'Lọc theo nhóm phòng', example: 'group-001' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách phòng',
        type: rooms_list_response_dto_1.RoomsListResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_rooms_dto_1.GetRoomsDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tìm kiếm phòng',
        description: 'Tìm kiếm phòng theo từ khóa.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'searchTerm', required: true, description: 'Từ khóa tìm kiếm', example: 'phòng 101' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Số lượng bản ghi trả về', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Vị trí bắt đầu', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: 'Lọc theo trạng thái hoạt động', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'departmentId', required: false, description: 'Lọc theo khoa', example: 'dept-001' }),
    (0, swagger_1.ApiQuery)({ name: 'roomGroupId', required: false, description: 'Lọc theo nhóm phòng', example: 'group-001' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kết quả tìm kiếm phòng',
        type: rooms_list_response_dto_1.RoomsListResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_rooms_dto_1.SearchRoomsDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "searchRooms", null);
__decorate([
    (0, common_1.Get)('by-department/:departmentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy phòng theo khoa',
        description: 'Lấy danh sách phòng thuộc một khoa cụ thể.'
    }),
    (0, swagger_1.ApiParam)({ name: 'departmentId', description: 'ID khoa' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Số lượng bản ghi trả về', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Vị trí bắt đầu', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: 'Lọc theo trạng thái hoạt động', example: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách phòng theo khoa',
        type: rooms_list_response_dto_1.RoomsListResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('departmentId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomsByDepartment", null);
__decorate([
    (0, common_1.Get)('by-group/:roomGroupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy phòng theo nhóm phòng',
        description: 'Lấy danh sách phòng thuộc một nhóm phòng cụ thể.'
    }),
    (0, swagger_1.ApiParam)({ name: 'roomGroupId', description: 'ID nhóm phòng' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Số lượng bản ghi trả về', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Vị trí bắt đầu', example: 0 }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: 'Lọc theo trạng thái hoạt động', example: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách phòng theo nhóm phòng',
        type: rooms_list_response_dto_1.RoomsListResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __param(0, (0, common_1.Param)('roomGroupId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomsByGroup", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Thống kê phòng',
        description: 'Lấy thống kê tổng quan về phòng.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thống kê phòng',
        schema: {
            type: 'object',
            properties: {
                total: { type: 'number', example: 100 },
                active: { type: 'number', example: 95 },
                inactive: { type: 'number', example: 5 },
                byDepartment: { type: 'object' },
                byRoomGroup: { type: 'object' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy thông tin phòng',
        description: 'Lấy thông tin chi tiết của một phòng theo ID.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID phòng' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin phòng',
        type: room_response_dto_1.RoomResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Không có quyền truy cập' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy phòng' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomById", null);
exports.RoomController = RoomController = __decorate([
    (0, swagger_1.ApiTags)('Rooms'),
    (0, common_1.Controller)('rooms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map