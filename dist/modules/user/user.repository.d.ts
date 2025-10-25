import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
export declare class UserRepository implements IUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    save(user: User): Promise<User>;
    delete(id: string): Promise<void>;
    findByIds(ids: string[]): Promise<User[]>;
    findActiveUsers(limit: number, offset: number): Promise<[User[], number]>;
}
