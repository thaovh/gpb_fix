export declare enum ProvinceSortBy {
    SORT_ORDER = "sortOrder",
    PROVINCE_NAME = "provinceName",
    PROVINCE_CODE = "provinceCode",
    CREATED_AT = "createdAt"
}
export declare enum ProvinceSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetProvincesDto {
    limit?: number;
    offset?: number;
    sortBy?: ProvinceSortBy;
    sortOrder?: ProvinceSortOrder;
    isActive?: boolean;
    search?: string;
}
