export declare enum DepartmentSortBy {
    DEPARTMENT_CODE = "departmentCode",
    DEPARTMENT_NAME = "departmentName",
    SORT_ORDER = "sortOrder",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt"
}
export declare enum DepartmentSortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class GetDepartmentsDto {
    limit?: number;
    offset?: number;
    search?: string;
    isActive?: boolean;
    branchId?: string;
    departmentTypeId?: string;
    parentDepartmentId?: string;
    sortBy?: DepartmentSortBy;
    sortOrder?: DepartmentSortOrder;
}
export interface GetDepartmentsResult {
    departments: any[];
    total: number;
    limit: number;
    offset: number;
}
