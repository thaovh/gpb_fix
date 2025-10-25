import { HospitalLevel } from '../commands/create-branch.dto';
export declare enum SearchType {
    NAME = "name",
    CODE = "code",
    SHORT_NAME = "shortName",
    ADDRESS = "address",
    PHONE = "phone",
    REPRESENTATIVE = "representative",
    BHYT = "bhy",
    HOSPITAL_LEVEL = "hospitalLevel",
    ALL = "all"
}
export declare enum SearchSortBy {
    BRANCH_NAME = "branchName",
    BRANCH_CODE = "branchCode",
    HOSPITAL_LEVEL = "hospitalLevel",
    CREATED_AT = "createdAt"
}
export declare enum SearchSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class SearchBranchesDto {
    keyword: string;
    searchType?: SearchType;
    provinceId?: string;
    wardId?: string;
    hospitalLevel?: HospitalLevel;
    limit?: number;
    offset?: number;
    sortBy?: SearchSortBy;
    sortOrder?: SearchSortOrder;
}
