import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/commands/create-branch.dto';
import { UpdateBranchDto } from './dto/commands/update-branch.dto';
import { GetBranchesDto } from './dto/queries/get-branches.dto';
import { SearchBranchesDto } from './dto/queries/search-branches.dto';
import { GetBranchesByProvinceDto } from './dto/queries/get-branches-by-province.dto';
import { GetBranchesByWardDto } from './dto/queries/get-branches-by-ward.dto';
import { BranchResponseDto } from './dto/responses/branch-response.dto';
import { BranchesListResponseDto } from './dto/responses/branches-list-response.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
export declare class BranchController {
    private readonly branchService;
    constructor(branchService: BranchService);
    createBranch(createBranchDto: CreateBranchDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<BranchResponseDto>>;
    updateBranch(id: string, updateBranchDto: UpdateBranchDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<BranchResponseDto>>;
    deleteBranch(id: string, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    hardDeleteBranch(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    getBranches(getBranchesDto: GetBranchesDto): Promise<import("../../common/builders/response.builder").BaseResponse<BranchesListResponseDto>>;
    searchBranches(searchBranchesDto: SearchBranchesDto): Promise<import("../../common/builders/response.builder").BaseResponse<BranchesListResponseDto>>;
    getBranchesByProvince(provinceId: string, getBranchesByProvinceDto: GetBranchesByProvinceDto): Promise<import("../../common/builders/response.builder").BaseResponse<BranchesListResponseDto>>;
    getBranchesByWard(wardId: string, getBranchesByWardDto: GetBranchesByWardDto): Promise<import("../../common/builders/response.builder").BaseResponse<BranchesListResponseDto>>;
    getBranchById(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<BranchResponseDto>>;
    getBranchStats(): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
}
