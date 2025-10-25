export declare enum SearchType {
    NAME = "name",
    CODE = "code",
    SHORT_NAME = "shortName",
    ALL = "all"
}
export declare enum SearchSortBy {
    SORT_ORDER = "sortOrder",
    WARD_NAME = "wardName",
    WARD_CODE = "wardCode",
    CREATED_AT = "createdAt"
}
export declare enum SearchSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class SearchWardsDto {
    keyword: string;
    searchType?: SearchType;
    provinceId?: string;
    limit?: number;
    offset?: number;
    sortBy?: SearchSortBy;
    sortOrder?: SearchSortOrder;
}
