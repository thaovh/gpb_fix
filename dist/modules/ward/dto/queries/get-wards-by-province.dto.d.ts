export declare enum ProvinceWardSortBy {
    SORT_ORDER = "sortOrder",
    WARD_NAME = "wardName",
    WARD_CODE = "wardCode",
    CREATED_AT = "createdAt"
}
export declare enum ProvinceWardSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetWardsByProvinceDto {
    provinceId: string;
    limit?: number;
    offset?: number;
    sortBy?: ProvinceWardSortBy;
    sortOrder?: ProvinceWardSortOrder;
    isActive?: boolean;
    search?: string;
}
