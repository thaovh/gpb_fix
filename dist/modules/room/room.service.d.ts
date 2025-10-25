import { DataSource } from 'typeorm';
import { IRoomRepository } from './interfaces/room.repository.interface';
import { CreateRoomDto } from './dto/commands/create-room.dto';
import { UpdateRoomDto } from './dto/commands/update-room.dto';
import { GetRoomsDto } from './dto/queries/get-rooms.dto';
import { SearchRoomsDto } from './dto/queries/search-rooms.dto';
import { GetRoomsByDepartmentDto } from './dto/queries/get-rooms-by-department.dto';
import { GetRoomsByGroupDto } from './dto/queries/get-rooms-by-group.dto';
import { RoomResponseDto } from './dto/responses/room-response.dto';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
import { DataLoaderService } from '../../shared/dataloaders/dataloader.service';
export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
export interface GetRoomsResult {
    rooms: RoomResponseDto[];
    total: number;
    limit: number;
    offset: number;
}
export declare class RoomService extends BaseService {
    private readonly roomRepository;
    protected readonly dataSource: DataSource;
    protected readonly currentUserContext: CurrentUserContextService;
    private readonly dataLoaderService;
    constructor(roomRepository: IRoomRepository, dataSource: DataSource, currentUserContext: CurrentUserContextService, dataLoaderService: DataLoaderService);
    createRoom(createRoomDto: CreateRoomDto, currentUser: CurrentUser): Promise<string>;
    updateRoom(id: string, updateRoomDto: UpdateRoomDto, currentUser: CurrentUser): Promise<void>;
    deleteRoom(id: string, currentUser: CurrentUser): Promise<void>;
    getRoomById(id: string): Promise<RoomResponseDto>;
    getRooms(query: GetRoomsDto): Promise<GetRoomsResult>;
    searchRooms(searchDto: SearchRoomsDto): Promise<GetRoomsResult>;
    getRoomsByDepartment(query: GetRoomsByDepartmentDto): Promise<GetRoomsResult>;
    getRoomsByGroup(query: GetRoomsByGroupDto): Promise<GetRoomsResult>;
    getRoomStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        byDepartment: {
            [key: string]: number;
        };
        byRoomGroup: {
            [key: string]: number;
        };
    }>;
    private getRoomStatsByDepartment;
    private getRoomStatsByRoomGroup;
    private mapRoomToResponseDto;
}
