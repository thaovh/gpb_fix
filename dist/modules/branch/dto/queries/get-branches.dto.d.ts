import { HospitalLevel } from '../commands/create-branch.dto';
export declare enum BranchSortBy {
    BRANCH_NAME = "branchName",
    BRANCH_CODE = "branchCode",
    HOSPITAL_LEVEL = "hospitalLevel",
    CREATED_AT = "createdAt"
}
export declare enum BranchSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetBranchesDto {
    limit?: number;
    offset?: number;
    sortBy?: BranchSortBy;
    sortOrder?: BranchSortOrder;
    isActive?: boolean;
    provinceId?: string;
    wardId?: string;
    hospitalLevel?: HospitalLevel;
    search?: string;
}
