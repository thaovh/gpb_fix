import { RoomGroup } from '../entities/room-group.entity';
export interface IRoomGroupRepository {
    findById(id: string): Promise<RoomGroup | null>;
    findByCode(roomGroupCode: string): Promise<RoomGroup | null>;
    save(roomGroup: RoomGroup): Promise<RoomGroup>;
    delete(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
    findAll(): Promise<RoomGroup[]>;
    findActive(): Promise<RoomGroup[]>;
    findInactive(): Promise<RoomGroup[]>;
    findByIds(ids: string[]): Promise<RoomGroup[]>;
    searchByKeyword(keyword: string): Promise<RoomGroup[]>;
    findWithPagination(limit: number, offset: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC', filters?: {
        isActive?: boolean;
        search?: string;
    }): Promise<[RoomGroup[], number]>;
    countTotal(): Promise<number>;
    countActive(): Promise<number>;
    countInactive(): Promise<number>;
    countByStatus(isActive: boolean): Promise<number>;
    getNextSortOrder(): Promise<number>;
    existsByCode(roomGroupCode: string, excludeId?: string): Promise<boolean>;
    existsByName(roomGroupName: string, excludeId?: string): Promise<boolean>;
}
