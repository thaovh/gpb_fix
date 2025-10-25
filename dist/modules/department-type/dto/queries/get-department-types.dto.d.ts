export declare enum DepartmentTypeSortBy {
    TYPE_CODE = "typeCode",
    TYPE_NAME = "typeName",
    SORT_ORDER = "sortOrder",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt"
}
export declare enum DepartmentTypeSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetDepartmentTypesDto {
    limit?: number;
    offset?: number;
    search?: string;
    isActive?: boolean;
    sortBy?: DepartmentTypeSortBy;
    sortOrder?: DepartmentTypeSortOrder;
}
