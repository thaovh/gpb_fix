import { DataSource } from 'typeorm';
import { IUserRepository } from './interfaces/user.repository.interface';
import { CreateUserDto } from './dto/commands/create-user.dto';
import { UpdateUserDto } from './dto/commands/update-user.dto';
import { GetUsersDto } from './dto/queries/get-users.dto';
import { UserResponseDto } from './dto/responses/user-response.dto';
import { PasswordService } from '../../shared/services/password.service';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
export interface GetUsersResult {
    users: UserResponseDto[];
    total: number;
    limit: number;
    offset: number;
}
export declare class UserService extends BaseService {
    private readonly userRepository;
    private readonly passwordService;
    constructor(userRepository: IUserRepository, dataSource: DataSource, passwordService: PasswordService, currentUserContext: CurrentUserContextService);
    createUser(createUserDto: CreateUserDto, currentUser: CurrentUser): Promise<string>;
    updateUser(id: string, updateUserDto: UpdateUserDto, currentUser: CurrentUser): Promise<void>;
    deleteUser(id: string): Promise<void>;
    activateUser(id: string): Promise<void>;
    getUserById(id: string): Promise<UserResponseDto>;
    getUsers(query: GetUsersDto): Promise<GetUsersResult>;
    findUserByEmail(email: string): Promise<UserResponseDto | null>;
    private mapUserToResponseDto;
}
