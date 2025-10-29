export declare class UserInfoDto {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    isActive: boolean;
}
export declare class HisUserInfo {
    loginName: string;
    userName: string;
    applicationCode: string;
    gCode: string;
    email: string;
    mobile: string;
}
export declare class HisSessionInfo {
    validAddress: string;
    loginTime: string;
    expireTime: string;
    loginAddress: string;
}
export declare class HisRole {
    roleCode: string;
    roleName: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserInfoDto;
    hisTokenCode?: string;
    hisRenewCode?: string;
    hisUserInfo?: HisUserInfo;
    hisSessionInfo?: HisSessionInfo;
    hisRoles?: HisRole[];
}
