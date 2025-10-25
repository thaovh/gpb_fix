import { BaseEntity } from '../../../common/entities/base.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { DepartmentType } from '../../department-type/entities/department-type.entity';
export declare class Department extends BaseEntity {
    departmentCode: string;
    departmentName: string;
    branchId: string;
    headOfDepartment?: string;
    headNurse?: string;
    parentDepartmentId?: string;
    shortName?: string;
    departmentTypeId: string;
    isActive: boolean;
    sortOrder: number;
    branch: Branch;
    departmentType: DepartmentType;
    parent: Department;
    children: Department[];
    getDisplayName(): string;
    getFullName(): string;
    isRootDepartment(): boolean;
    hasChildren(): boolean;
    getHierarchyLevel(): number;
}
