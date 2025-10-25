import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("../../common/builders/response.builder").BaseResponse<AuthResponseDto>>;
    register(registerDto: RegisterDto): Promise<import("../../common/builders/response.builder").BaseResponse<AuthResponseDto>>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<import("../../common/builders/response.builder").BaseResponse<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(req: Request & {
        user: any;
    }): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getProfile(req: Request & {
        user: any;
    }): Promise<import("../../common/builders/response.builder").BaseResponse<ProfileResponseDto>>;
    updateProfile(req: Request & {
        user: any;
    }, updateProfileDto: UpdateProfileDto): Promise<import("../../common/builders/response.builder").BaseResponse<ProfileResponseDto>>;
}
