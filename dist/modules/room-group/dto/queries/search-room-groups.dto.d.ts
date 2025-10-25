import { GetRoomGroupsDto } from './get-room-groups.dto';
declare const SearchRoomGroupsDto_base: import("@nestjs/common").Type<Partial<GetRoomGroupsDto>>;
export declare class SearchRoomGroupsDto extends SearchRoomGroupsDto_base {
    keyword: string;
    isActive?: boolean;
}
export {};
