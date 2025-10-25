import { IBranchRepository } from './interfaces/branch.repository.interface';
import { CreateBranchDto } from './dto/commands/create-branch.dto';
import { UpdateBranchDto } from './dto/commands/update-branch.dto';
import { GetBranchesDto } from './dto/queries/get-branches.dto';
import { SearchBranchesDto } from './dto/queries/search-branches.dto';
import { GetBranchesByProvinceDto } from './dto/queries/get-branches-by-province.dto';
import { GetBranchesByWardDto } from './dto/queries/get-branches-by-ward.dto';
import { BranchResponseDto } from './dto/responses/branch-response.dto';
import { BranchesListResponseDto } from './dto/responses/branches-list-response.dto';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
export declare class BranchService extends BaseService {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository, dataSource: any, currentUserContext: CurrentUserContextService);
    createBranch(createBranchDto: CreateBranchDto, createdBy: string): Promise<BranchResponseDto>;
    updateBranch(id: string, updateBranchDto: UpdateBranchDto, updatedBy: string): Promise<BranchResponseDto>;
    deleteBranch(id: string, deletedBy: string): Promise<void>;
    hardDeleteBranch(id: string): Promise<void>;
    getBranches(getBranchesDto: GetBranchesDto): Promise<BranchesListResponseDto>;
    getBranchById(id: string): Promise<BranchResponseDto>;
    searchBranches(searchBranchesDto: SearchBranchesDto): Promise<BranchesListResponseDto>;
    getBranchesByProvince(getBranchesByProvinceDto: GetBranchesByProvinceDto): Promise<BranchesListResponseDto>;
    getBranchesByWard(getBranchesByWardDto: GetBranchesByWardDto): Promise<BranchesListResponseDto>;
    getBranchStats(): Promise<any>;
    private validateProvinceAndWard;
    private generateBranchCode;
    private mapBranchToResponseDto;
}
