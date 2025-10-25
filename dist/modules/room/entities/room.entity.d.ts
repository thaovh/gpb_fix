import { BaseEntity } from '../../../common/entities/base.entity';
import { Department } from '../../department/entities/department.entity';
import { RoomGroup } from '../../room-group/entities/room-group.entity';
export declare class Room extends BaseEntity {
    roomCode: string;
    roomName: string;
    roomAddress?: string;
    departmentId: string;
    roomGroupId: string;
    description?: string;
    isActive: boolean;
    sortOrder: number;
    department: Department;
    roomGroup: RoomGroup;
    getDisplayName(): string;
    getFullName(): string;
    isAvailable(): boolean;
}
