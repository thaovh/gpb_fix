import { DataSource } from 'typeorm';
import { IRoomGroupRepository } from './interfaces/room-group.repository.interface';
import { CreateRoomGroupDto } from './dto/commands/create-room-group.dto';
import { UpdateRoomGroupDto } from './dto/commands/update-room-group.dto';
import { GetRoomGroupsDto, GetRoomGroupsResult } from './dto/queries/get-room-groups.dto';
import { RoomGroupResponseDto } from './dto/responses/room-group-response.dto';
import { SearchRoomGroupsDto } from './dto/queries/search-room-groups.dto';
import { CurrentUser } from '../../common/interfaces/current-user.interface';
import { DataLoaderService } from '../../shared/dataloaders/dataloader.service';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
export declare class RoomGroupService extends BaseService {
    private readonly roomGroupRepository;
    protected readonly dataSource: DataSource;
    private readonly dataLoaderService;
    protected readonly currentUserContext: CurrentUserContextService;
    constructor(roomGroupRepository: IRoomGroupRepository, dataSource: DataSource, dataLoaderService: DataLoaderService, currentUserContext: CurrentUserContextService);
    createRoomGroup(createDto: CreateRoomGroupDto, currentUser: CurrentUser): Promise<string>;
    updateRoomGroup(id: string, updateDto: UpdateRoomGroupDto, currentUser: CurrentUser): Promise<void>;
    deleteRoomGroup(id: string, hardDelete?: boolean): Promise<void>;
    getRoomGroupById(id: string): Promise<RoomGroupResponseDto>;
    getRoomGroups(query: GetRoomGroupsDto): Promise<GetRoomGroupsResult>;
    searchRoomGroups(query: SearchRoomGroupsDto): Promise<GetRoomGroupsResult>;
    getRoomGroupsWithStats(query: GetRoomGroupsDto): Promise<GetRoomGroupsResult>;
    getStatsOverview(): Promise<any>;
    reorderRoomGroups(roomGroupIds: string[]): Promise<void>;
    private mapToResponseDto;
}
