import { HospitalLevel } from '../commands/create-branch.dto';
export declare enum ProvinceBranchSortBy {
    BRANCH_NAME = "branchName",
    BRANCH_CODE = "branchCode",
    HOSPITAL_LEVEL = "hospitalLevel",
    CREATED_AT = "createdAt"
}
export declare enum ProvinceBranchSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetBranchesByProvinceDto {
    provinceId: string;
    limit?: number;
    offset?: number;
    sortBy?: ProvinceBranchSortBy;
    sortOrder?: ProvinceBranchSortOrder;
    isActive?: boolean;
    hospitalLevel?: HospitalLevel;
    search?: string;
}
