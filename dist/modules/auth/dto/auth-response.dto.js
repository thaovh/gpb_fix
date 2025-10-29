"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDto = exports.HisRole = exports.HisSessionInfo = exports.HisUserInfo = exports.UserInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserInfoDto {
}
exports.UserInfoDto = UserInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the user',
        example: 'user-uuid-here'
    }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Username of the user',
        example: 'john_doe'
    }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the user',
        example: 'john.doe@example.com'
    }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the user',
        example: 'John'
    }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the user',
        example: 'Doe'
    }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the user',
        example: 'John Doe'
    }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user account is active',
        example: true
    }),
    __metadata("design:type", Boolean)
], UserInfoDto.prototype, "isActive", void 0);
class HisUserInfo {
}
exports.HisUserInfo = HisUserInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Login name from HIS system',
        example: 'vht2'
    }),
    __metadata("design:type", String)
], HisUserInfo.prototype, "loginName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User name from HIS system',
        example: 'VŨ HOÀNG THAO'
    }),
    __metadata("design:type", String)
], HisUserInfo.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Application code from HIS system',
        example: 'HIS'
    }),
    __metadata("design:type", String)
], HisUserInfo.prototype, "applicationCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'GCode from HIS system',
        example: '0000000001'
    }),
    __metadata("design:type", String)
], HisUserInfo.prototype, "gCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email from HIS system',
        example: 'vht2@bachmai.edu.vn'
    }),
    __metadata("design:type", String)
], HisUserInfo.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mobile from HIS system',
        example: '0936226839'
    }),
    __metadata("design:type", String)
], HisUserInfo.prototype, "mobile", void 0);
class HisSessionInfo {
}
exports.HisSessionInfo = HisSessionInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valid address from HIS system',
        example: '192.168.68.209'
    }),
    __metadata("design:type", String)
], HisSessionInfo.prototype, "validAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Login time from HIS system',
        example: '2025-10-28T11:31:05.4519176+07:00'
    }),
    __metadata("design:type", String)
], HisSessionInfo.prototype, "loginTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expire time from HIS system',
        example: '2025-11-27T11:31:05.4519176+07:00'
    }),
    __metadata("design:type", String)
], HisSessionInfo.prototype, "expireTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Login address from HIS system',
        example: '192.168.68.209'
    }),
    __metadata("design:type", String)
], HisSessionInfo.prototype, "loginAddress", void 0);
class HisRole {
}
exports.HisRole = HisRole;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role code from HIS system',
        example: 'CNDTG'
    }),
    __metadata("design:type", String)
], HisRole.prototype, "roleCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role name from HIS system',
        example: 'Cập nhật dòng thời gian'
    }),
    __metadata("design:type", String)
], HisRole.prototype, "roleName", void 0);
class AuthResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT access token for API authentication',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT refresh token for getting new access tokens',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User information',
        type: UserInfoDto
    }),
    __metadata("design:type", UserInfoDto)
], AuthResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HIS token code for external system integration',
        example: '3f6d26f8369916d79eadfc1b09f2533ac95204efec3af2dc504d3af6064c1ff4',
        required: false
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "hisTokenCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HIS renew code for token refresh',
        example: 'b0d2ea39752e15b191d8707ca9ca90119480ea167f094cdc41bb92742cdec554b0d2ea39752e15b191d8707ca9ca90119480ea167f094cdc41bb92742cdec554',
        required: false
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "hisRenewCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HIS user information',
        type: HisUserInfo,
        required: false
    }),
    __metadata("design:type", HisUserInfo)
], AuthResponseDto.prototype, "hisUserInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HIS session information',
        type: HisSessionInfo,
        required: false
    }),
    __metadata("design:type", HisSessionInfo)
], AuthResponseDto.prototype, "hisSessionInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HIS user roles',
        type: [HisRole],
        required: false
    }),
    __metadata("design:type", Array)
], AuthResponseDto.prototype, "hisRoles", void 0);
//# sourceMappingURL=auth-response.dto.js.map