import { Controller, Post, Body, Get, Put, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResponseBuilder } from '../../common/builders/response.builder';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({
        summary: 'User login',
        description: 'Authenticate user and return JWT tokens'
    })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: AuthResponseDto
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);
        return ResponseBuilder.success(result);
    }

    @Post('register')
    @ApiOperation({
        summary: 'User registration',
        description: 'Register a new user account'
    })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({
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
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    async register(@Body() registerDto: RegisterDto) {
        const result = await this.authService.register(registerDto);
        return ResponseBuilder.success(result, 201);
    }

    // ========== PHASE 1 ENDPOINTS ==========

    @Post('refresh')
    @ApiOperation({
        summary: 'Refresh access token',
        description: 'Get new access token using refresh token'
    })
    @ApiBody({ type: RefreshTokenDto })
    @ApiResponse({
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
    })
    @ApiResponse({ status: 401, description: 'Invalid refresh token' })
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        const result = await this.authService.refreshToken(refreshTokenDto);
        return ResponseBuilder.success(result);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'User logout',
        description: 'Logout user and invalidate tokens'
    })
    @ApiResponse({
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
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - invalid JWT token' })
    async logout(@Request() req: Request & { user: any }) {
        const result = await this.authService.logout(req.user.id);
        return ResponseBuilder.success(result);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Get user profile',
        description: 'Get current user profile information'
    })
    @ApiResponse({
        status: 200,
        description: 'Profile retrieved successfully',
        type: ProfileResponseDto
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - invalid JWT token' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getProfile(@Request() req: Request & { user: any }) {
        const result = await this.authService.getProfile(req.user.id);
        return ResponseBuilder.success(result);
    }

    @Put('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Update user profile',
        description: 'Update current user profile information'
    })
    @ApiBody({ type: UpdateProfileDto })
    @ApiResponse({
        status: 200,
        description: 'Profile updated successfully',
        type: ProfileResponseDto
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - invalid JWT token' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    async updateProfile(
        @Request() req: Request & { user: any },
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        const result = await this.authService.updateProfile(req.user.id, updateProfileDto);
        return ResponseBuilder.success(result);
    }
}
