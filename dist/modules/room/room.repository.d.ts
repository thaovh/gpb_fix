import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { IRoomRepository } from './interfaces/room.repository.interface';
export declare class RoomRepository implements IRoomRepository {
    private readonly roomRepository;
    constructor(roomRepository: Repository<Room>);
    findById(id: string): Promise<Room | null>;
    save(room: Room): Promise<Room>;
    delete(id: string): Promise<void>;
    findAll(limit?: number, offset?: number): Promise<[Room[], number]>;
    findByDepartmentId(departmentId: string, limit?: number, offset?: number): Promise<[Room[], number]>;
    findByRoomGroupId(roomGroupId: string, limit?: number, offset?: number): Promise<[Room[], number]>;
    findActive(limit?: number, offset?: number): Promise<[Room[], number]>;
    searchByCode(roomCode: string): Promise<Room[]>;
    searchByName(roomName: string): Promise<Room[]>;
    searchByAddress(address: string): Promise<Room[]>;
    searchByDescription(description: string): Promise<Room[]>;
    existsByCode(roomCode: string, excludeId?: string): Promise<boolean>;
    existsByName(roomName: string, excludeId?: string): Promise<boolean>;
    existsByNameInDepartment(roomName: string, departmentId: string, excludeId?: string): Promise<boolean>;
    countByDepartment(departmentId: string): Promise<number>;
    countByRoomGroup(roomGroupId: string): Promise<number>;
    countActive(): Promise<number>;
    countTotal(): Promise<number>;
    findByIds(ids: string[]): Promise<Room[]>;
    findByDepartmentIds(departmentIds: string[]): Promise<Room[]>;
    findByRoomGroupIds(roomGroupIds: string[]): Promise<Room[]>;
}
