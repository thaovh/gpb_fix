import { HospitalLevel } from '../commands/create-branch.dto';
export declare enum WardBranchSortBy {
    BRANCH_NAME = "branchName",
    BRANCH_CODE = "branchCode",
    HOSPITAL_LEVEL = "hospitalLevel",
    CREATED_AT = "createdAt"
}
export declare enum WardBranchSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetBranchesByWardDto {
    wardId: string;
    limit?: number;
    offset?: number;
    sortBy?: WardBranchSortBy;
    sortOrder?: WardBranchSortOrder;
    isActive?: boolean;
    hospitalLevel?: HospitalLevel;
    search?: string;
}
