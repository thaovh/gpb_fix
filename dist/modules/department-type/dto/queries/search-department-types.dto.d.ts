export declare enum SearchSortBy {
    TYPE_CODE = "typeCode",
    TYPE_NAME = "typeName",
    SORT_ORDER = "sortOrder",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt"
}
export declare enum SearchSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class SearchDepartmentTypesDto {
    keyword: string;
    limit?: number;
    offset?: number;
    isActive?: boolean;
    sortBy?: SearchSortBy;
    sortOrder?: SearchSortOrder;
}
