import { Injectable, Inject, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../user/interfaces/user.repository.interface';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { PasswordService } from '../../shared/services/password.service';
import { AppError } from '../../common/errors/app.error';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
    ) { }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.userRepository.findByUsername(loginDto.username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await this.passwordService.verifyPassword(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw AppError.unauthorized('Invalid credentials');
        }

        if (!user.isAccountActive()) {
            throw new UnauthorizedException('Account is inactive');
        }

        const tokens = await this.generateTokens(user);
        const userResponse = this.mapUserToResponseDto(user);

        return {
            ...tokens,
            user: userResponse,
        };
    }

    async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
        // Validate password strength
        const passwordValidation = this.passwordService.validatePasswordStrength(registerDto.password);
        if (!passwordValidation.isValid) {
            throw AppError.passwordStrengthError(passwordValidation.errors);
        }

        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await this.passwordService.hashPassword(registerDto.password);

        // Create user
        const user = new User();
        user.username = registerDto.username;
        user.email = registerDto.email;
        user.passwordHash = hashedPassword;
        user.fullName = registerDto.fullName;

        const savedUser = await this.userRepository.save(user);

        // Generate tokens
        const tokens = await this.generateTokens(savedUser);
        const userResponse = this.mapUserToResponseDto(savedUser);

        return {
            ...tokens,
            user: userResponse,
        };
    }

    private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
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


    // ========== PHASE 1 METHODS ==========

    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            // Verify refresh token
            const payload = this.jwtService.verify(refreshTokenDto.refreshToken);

            // Get user from database
            const user = await this.userRepository.findById(payload.sub);
            if (!user || !user.isAccountActive()) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            // Generate new tokens
            const tokens = await this.generateTokens(user);
            return tokens;
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string): Promise<{ message: string }> {
        // In a real application, you would:
        // 1. Add the token to a blacklist
        // 2. Remove from active sessions
        // 3. Log the logout event

        // For now, just return success message
        return { message: 'Logged out successfully' };
    }

    async getProfile(userId: string): Promise<ProfileResponseDto> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.mapUserToProfileDto(user);
    }

    async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<ProfileResponseDto> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Update user fields
        if (updateProfileDto.fullName !== undefined) {
            user.fullName = updateProfileDto.fullName;
        }
        if (updateProfileDto.phoneNumber !== undefined) {
            user.phoneNumber = updateProfileDto.phoneNumber;
        }
        if (updateProfileDto.address !== undefined) {
            user.address = updateProfileDto.address;
        }

        // Save updated user
        const updatedUser = await this.userRepository.save(user);
        return this.mapUserToProfileDto(updatedUser);
    }

    // ========== PRIVATE METHODS ==========

    private mapUserToResponseDto(user: User): any {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            isActive: user.isActive,
        };
    }

    private mapUserToProfileDto(user: User): ProfileResponseDto {
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
}
