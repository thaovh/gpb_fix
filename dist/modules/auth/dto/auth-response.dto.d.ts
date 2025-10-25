export declare class UserInfoDto {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    isActive: boolean;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserInfoDto;
}
