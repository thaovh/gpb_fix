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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const auth_response_dto_1 = require("./dto/auth-response.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const profile_response_dto_1 = require("./dto/profile-response.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const response_builder_1 = require("../../common/builders/response.builder");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        const result = await this.authService.login(loginDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async register(registerDto) {
        const result = await this.authService.register(registerDto);
        return response_builder_1.ResponseBuilder.success(result, 201);
    }
    async refreshToken(refreshTokenDto) {
        const result = await this.authService.refreshToken(refreshTokenDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async logout(req) {
        const result = await this.authService.logout(req.user.id);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async getProfile(req) {
        const result = await this.authService.getProfile(req.user.id);
        return response_builder_1.ResponseBuilder.success(result);
    }
    async updateProfile(req, updateProfileDto) {
        const result = await this.authService.updateProfile(req.user.id, updateProfileDto);
        return response_builder_1.ResponseBuilder.success(result);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'User login',
        description: 'Authenticate user and return JWT tokens'
    }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful',
        type: auth_response_dto_1.AuthResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'User registration',
        description: 'Register a new user account'
    }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User registered successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 201 },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'user-uuid-here' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation failed' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh access token',
        description: 'Get new access token using refresh token'
    }),
    (0, swagger_1.ApiBody)({ type: refresh_token_dto_1.RefreshTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token refreshed successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
                        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid refresh token' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'User logout',
        description: 'Logout user and invalidate tokens'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Logged out successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Logged out successfully' }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - invalid JWT token' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user profile',
        description: 'Get current user profile information'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile retrieved successfully',
        type: profile_response_dto_1.ProfileResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - invalid JWT token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user profile',
        description: 'Update current user profile information'
    }),
    (0, swagger_1.ApiBody)({ type: update_profile_dto_1.UpdateProfileDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully',
        type: profile_response_dto_1.ProfileResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - invalid JWT token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation failed' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map