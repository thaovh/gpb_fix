import { UserService, CurrentUser } from './user.service';
import { CreateUserDto } from './dto/commands/create-user.dto';
import { UpdateUserDto } from './dto/commands/update-user.dto';
import { GetUsersDto } from './dto/queries/get-users.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateUser(id: string, updateUserDto: UpdateUserDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteUser(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    activateUser(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getUsers(query: GetUsersDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./user.service").GetUsersResult>>;
    getUser(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/responses/user-response.dto").UserResponseDto>>;
    findUserByEmail(email: string): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/responses/user-response.dto").UserResponseDto>>;
}
