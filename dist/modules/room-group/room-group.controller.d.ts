import { RoomGroupService } from './room-group.service';
import { CreateRoomGroupDto } from './dto/commands/create-room-group.dto';
import { UpdateRoomGroupDto } from './dto/commands/update-room-group.dto';
import { GetRoomGroupsDto } from './dto/queries/get-room-groups.dto';
import { SearchRoomGroupsDto } from './dto/queries/search-room-groups.dto';
import { RoomGroupResponseDto } from './dto/responses/room-group-response.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
export declare class RoomGroupController {
    private readonly roomGroupService;
    constructor(roomGroupService: RoomGroupService);
    createRoomGroup(createDto: CreateRoomGroupDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateRoomGroup(id: string, updateDto: UpdateRoomGroupDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteRoomGroup(id: string, hardDelete?: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getRoomGroups(query: GetRoomGroupsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/queries/get-room-groups.dto").GetRoomGroupsResult>>;
    searchRoomGroups(query: SearchRoomGroupsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/queries/get-room-groups.dto").GetRoomGroupsResult>>;
    getRoomGroupsWithStats(query: GetRoomGroupsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/queries/get-room-groups.dto").GetRoomGroupsResult>>;
    getStatsOverview(): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    getRoomGroupById(id: string, includeDeleted?: string): Promise<import("../../common/builders/response.builder").BaseResponse<RoomGroupResponseDto>>;
    reorderRoomGroups(roomGroupIds: string[]): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
}
