import { RoomResponseDto } from './room-response.dto';
export declare class RoomPaginationDto {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export declare class RoomsListResponseDto {
    rooms: RoomResponseDto[];
    pagination: RoomPaginationDto;
}
