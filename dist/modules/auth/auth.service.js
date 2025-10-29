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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const password_service_1 = require("../../shared/services/password.service");
const his_integration_service_1 = require("../../shared/services/his-integration.service");
const app_error_1 = require("../../common/errors/app.error");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, passwordService, hisIntegrationService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordService = passwordService;
        this.hisIntegrationService = hisIntegrationService;
    }
    async login(loginDto) {
        const user = await this.userRepository.findByUsername(loginDto.username);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await this.passwordService.verifyPassword(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw app_error_1.AppError.unauthorized('Invalid credentials');
        }
        if (!user.isAccountActive()) {
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        const tokens = await this.generateTokens(user);
        const userResponse = this.mapUserToResponseDto(user);
        let hisData = null;
        try {
            if (user?.profile?.mappedUsername && user?.profile?.mappedPassword) {
                console.log('Attempting HIS login with credentials:', user.profile.mappedUsername);
                hisData = await this.hisIntegrationService.loginWithHis(user.profile.mappedUsername, user.profile.mappedPassword);
                console.log('HIS login successful:', hisData?.Data?.TokenCode);
            }
            else {
                console.log('No HIS credentials found in user profile');
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('HIS integration failed:', errorMessage);
        }
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: userResponse,
            hisTokenCode: hisData?.Data?.TokenCode || null,
            hisRenewCode: hisData?.Data?.RenewCode || null,
            hisUserInfo: hisData?.Data?.User ? {
                loginName: hisData.Data.User.LoginName,
                userName: hisData.Data.User.UserName,
                applicationCode: hisData.Data.User.ApplicationCode,
                gCode: hisData.Data.User.GCode,
                email: hisData.Data.User.Email,
                mobile: hisData.Data.User.Mobile,
            } : null,
            hisSessionInfo: hisData?.Data ? {
                validAddress: hisData.Data.ValidAddress,
                loginTime: hisData.Data.LoginTime,
                expireTime: hisData.Data.ExpireTime,
                loginAddress: hisData.Data.LoginAddress,
            } : null,
            hisRoles: hisData?.Data?.RoleDatas || null,
        };
    }
    async register(registerDto) {
        const passwordValidation = this.passwordService.validatePasswordStrength(registerDto.password);
        if (!passwordValidation.isValid) {
            throw app_error_1.AppError.passwordStrengthError(passwordValidation.errors);
        }
        const existingUser = await this.userRepository.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await this.passwordService.hashPassword(registerDto.password);
        const user = new user_entity_1.User();
        user.username = registerDto.username;
        user.email = registerDto.email;
        user.passwordHash = hashedPassword;
        user.fullName = registerDto.fullName;
        const savedUser = await this.userRepository.save(user);
        const tokens = await this.generateTokens(savedUser);
        const userResponse = this.mapUserToResponseDto(savedUser);
        return {
            ...tokens,
            user: userResponse,
        };
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        });
        return { accessToken, refreshToken };
    }
    async refreshToken(refreshTokenDto) {
        try {
            const payload = this.jwtService.verify(refreshTokenDto.refreshToken);
            const user = await this.userRepository.findById(payload.sub);
            if (!user || !user.isAccountActive()) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const tokens = await this.generateTokens(user);
            return tokens;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(userId) {
        return { message: 'Logged out successfully' };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapUserToProfileDto(user);
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateProfileDto.fullName !== undefined) {
            user.fullName = updateProfileDto.fullName;
        }
        if (updateProfileDto.phoneNumber !== undefined) {
            user.phoneNumber = updateProfileDto.phoneNumber;
        }
        if (updateProfileDto.address !== undefined) {
            user.address = updateProfileDto.address;
        }
        const updatedUser = await this.userRepository.save(user);
        return this.mapUserToProfileDto(updatedUser);
    }
    mapUserToResponseDto(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            isActive: user.isActive,
        };
    }
    mapUserToProfileDto(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        password_service_1.PasswordService,
        his_integration_service_1.HisIntegrationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map