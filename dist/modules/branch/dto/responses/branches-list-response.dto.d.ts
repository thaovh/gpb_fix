import { BranchResponseDto } from './branch-response.dto';
export declare class BranchPaginationDto {
    total: number;
    limit: number;
    offset: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export declare class BranchStatsDto {
    totalBranches: number;
    activeBranches: number;
    inactiveBranches: number;
    softDeletedBranches: number;
    branchesByLevel: Record<string, number>;
    branchesByProvince: Record<string, number>;
}
export declare class BranchesListResponseDto {
    branches: BranchResponseDto[];
    pagination: BranchPaginationDto;
    stats?: BranchStatsDto;
}
