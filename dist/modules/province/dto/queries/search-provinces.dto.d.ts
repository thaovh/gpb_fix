export declare enum SearchType {
    NAME = "name",
    CODE = "code",
    SHORT_NAME = "shortName",
    ALL = "all"
}
export declare enum SearchSortBy {
    SORT_ORDER = "sortOrder",
    PROVINCE_NAME = "provinceName",
    PROVINCE_CODE = "provinceCode",
    CREATED_AT = "createdAt"
}
export declare enum SearchSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class SearchProvincesDto {
    keyword: string;
    searchType?: SearchType;
    limit?: number;
    offset?: number;
    sortBy?: SearchSortBy;
    sortOrder?: SearchSortOrder;
}
