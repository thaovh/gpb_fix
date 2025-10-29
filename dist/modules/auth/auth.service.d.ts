import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../user/interfaces/user.repository.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { PasswordService } from '../../shared/services/password.service';
import { HisIntegrationService } from '../../shared/services/his-integration.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly passwordService;
    private readonly hisIntegrationService;
    constructor(userRepository: IUserRepository, jwtService: JwtService, passwordService: PasswordService, hisIntegrationService: HisIntegrationService);
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    private generateTokens;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<ProfileResponseDto>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<ProfileResponseDto>;
    private mapUserToResponseDto;
    private mapUserToProfileDto;
}
