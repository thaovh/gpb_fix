export declare class RoomResponseDto {
    id: string;
    roomCode: string;
    roomName: string;
    roomAddress?: string;
    departmentId: string;
    roomGroupId: string;
    description?: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    department?: {
        id: string;
        departmentCode: string;
        departmentName: string;
    };
    roomGroup?: {
        id: string;
        roomGroupCode: string;
        roomGroupName: string;
    };
}
