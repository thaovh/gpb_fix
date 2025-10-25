export declare enum RoomGroupSortBy {
    ROOM_GROUP_CODE = "roomGroupCode",
    ROOM_GROUP_NAME = "roomGroupName",
    SORT_ORDER = "sortOrder",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt"
}
export declare enum RoomGroupSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetRoomGroupsDto {
    limit?: number;
    offset?: number;
    search?: string;
    isActive?: boolean;
    sortBy?: RoomGroupSortBy;
    sortOrder?: RoomGroupSortOrder;
}
export interface GetRoomGroupsResult {
    roomGroups: any[];
    total: number;
    limit: number;
    offset: number;
}
