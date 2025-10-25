export declare class DepartmentResponseDto {
    id: string;
    departmentCode: string;
    departmentName: string;
    displayName: string;
    branchId: string;
    branchName?: string;
    headOfDepartment?: string;
    headNurse?: string;
    parentDepartmentId?: string;
    parentDepartmentName?: string;
    shortName?: string;
    departmentTypeId: string;
    departmentTypeName?: string;
    sortOrder: number;
    isActive: boolean;
    version: number;
    createdAt: Date;
    updatedAt: Date;
    hierarchyLevel: number;
    isRoot: boolean;
    hasChildren: boolean;
}
