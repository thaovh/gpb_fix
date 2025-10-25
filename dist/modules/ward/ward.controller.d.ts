import { WardService } from './ward.service';
import { CreateWardDto } from './dto/commands/create-ward.dto';
import { UpdateWardDto } from './dto/commands/update-ward.dto';
import { GetWardsDto } from './dto/queries/get-wards.dto';
import { SearchWardsDto } from './dto/queries/search-wards.dto';
import { GetWardsByProvinceDto } from './dto/queries/get-wards-by-province.dto';
import { WardResponseDto } from './dto/responses/ward-response.dto';
import { WardsListResponseDto } from './dto/responses/wards-list-response.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
export declare class WardController {
    private readonly wardService;
    constructor(wardService: WardService);
    createWard(createWardDto: CreateWardDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateWard(id: string, updateWardDto: UpdateWardDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteWard(id: string, hardDelete: string, req: Request & {
        user: any;
    }): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getWards(getWardsDto: GetWardsDto): Promise<import("../../common/builders/response.builder").BaseResponse<WardsListResponseDto>>;
    searchWards(searchWardsDto: SearchWardsDto): Promise<import("../../common/builders/response.builder").BaseResponse<WardsListResponseDto>>;
    getWardsByProvince(provinceId: string, getWardsByProvinceDto: Omit<GetWardsByProvinceDto, 'provinceId'>): Promise<import("../../common/builders/response.builder").BaseResponse<WardsListResponseDto>>;
    getWardById(id: string, includeDeleted: string): Promise<import("../../common/builders/response.builder").BaseResponse<WardResponseDto>>;
    getWardsStats(): Promise<import("../../common/builders/response.builder").BaseResponse<{
        total: number;
        active: number;
        inactive: number;
    }>>;
    getWardsStatsByProvince(provinceId: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        total: number;
        active: number;
        inactive: number;
    }>>;
    reorderWards(provinceId?: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
}
