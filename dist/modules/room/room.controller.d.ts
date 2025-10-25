import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/commands/create-room.dto';
import { UpdateRoomDto } from './dto/commands/update-room.dto';
import { GetRoomsDto } from './dto/queries/get-rooms.dto';
import { SearchRoomsDto } from './dto/queries/search-rooms.dto';
import { GetRoomsByDepartmentDto } from './dto/queries/get-rooms-by-department.dto';
import { GetRoomsByGroupDto } from './dto/queries/get-rooms-by-group.dto';
import { RoomResponseDto } from './dto/responses/room-response.dto';
import { CurrentUser as CurrentUserInterface } from '../../common/interfaces/current-user.interface';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    createRoom(createRoomDto: CreateRoomDto, currentUser: CurrentUserInterface): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateRoom(id: string, updateRoomDto: UpdateRoomDto, currentUser: CurrentUserInterface): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteRoom(id: string, currentUser: CurrentUserInterface): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    getRooms(query: GetRoomsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./room.service").GetRoomsResult>>;
    searchRooms(searchDto: SearchRoomsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./room.service").GetRoomsResult>>;
    getRoomsByDepartment(departmentId: string, query: Omit<GetRoomsByDepartmentDto, 'departmentId'>): Promise<import("../../common/builders/response.builder").BaseResponse<import("./room.service").GetRoomsResult>>;
    getRoomsByGroup(roomGroupId: string, query: Omit<GetRoomsByGroupDto, 'roomGroupId'>): Promise<import("../../common/builders/response.builder").BaseResponse<import("./room.service").GetRoomsResult>>;
    getRoomStats(): Promise<import("../../common/builders/response.builder").BaseResponse<{
        total: number;
        active: number;
        inactive: number;
        byDepartment: {
            [key: string]: number;
        };
        byRoomGroup: {
            [key: string]: number;
        };
    }>>;
    getRoomById(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<RoomResponseDto>>;
}
