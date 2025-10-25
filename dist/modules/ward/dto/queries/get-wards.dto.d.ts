export declare enum WardSortBy {
    SORT_ORDER = "sortOrder",
    WARD_NAME = "wardName",
    WARD_CODE = "wardCode",
    CREATED_AT = "createdAt"
}
export declare enum WardSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetWardsDto {
    limit?: number;
    offset?: number;
    sortBy?: WardSortBy;
    sortOrder?: WardSortOrder;
    isActive?: boolean;
    provinceId?: string;
    search?: string;
}
