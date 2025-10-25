import { BaseEntity } from '../../../common/entities/base.entity';
export declare class RoomGroup extends BaseEntity {
    roomGroupCode: string;
    roomGroupName: string;
    isActive: boolean;
    sortOrder: number;
    getDisplayName(): string;
    getFullName(): string;
    isRoomGroupActive(): boolean;
    getShortDisplayName(): string;
    validateRoomGroupCode(): boolean;
    validateRoomGroupName(): boolean;
    toJSON(): {
        id: string;
        roomGroupCode: string;
        roomGroupName: string;
        isActive: boolean;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        updatedBy: string;
        version: number;
    };
}
