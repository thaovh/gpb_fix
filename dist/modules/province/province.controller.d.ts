import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/commands/create-province.dto';
import { UpdateProvinceDto } from './dto/commands/update-province.dto';
import { GetProvincesDto } from './dto/queries/get-provinces.dto';
import { SearchProvincesDto } from './dto/queries/search-provinces.dto';
import { ProvinceResponseDto } from './dto/responses/province-response.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
export declare class ProvinceController {
    private readonly provinceService;
    constructor(provinceService: ProvinceService);
    createProvince(createProvinceDto: CreateProvinceDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateProvince(id: string, updateProvinceDto: UpdateProvinceDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteProvince(id: string, hardDelete: string, req: Request & {
        user: any;
    }): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getProvinces(getProvincesDto: GetProvincesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./province.service").GetProvincesResult>>;
    searchProvinces(searchProvincesDto: SearchProvincesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./province.service").GetProvincesResult>>;
    getProvinceById(id: string, includeDeleted: string): Promise<import("../../common/builders/response.builder").BaseResponse<ProvinceResponseDto>>;
    getProvincesStats(): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    reorderProvinces(): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getProvincesWithWards(query: GetProvincesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./province.service").GetProvincesResult>>;
    getProvincesWithBranches(query: GetProvincesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./province.service").GetProvincesResult>>;
}
