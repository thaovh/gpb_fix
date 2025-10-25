import { BaseEntity } from '../../../common/entities/base.entity';
export declare class DepartmentType extends BaseEntity {
    typeCode: string;
    typeName: string;
    description?: string;
    isActive: boolean;
    sortOrder: number;
    departments: any[];
    getDisplayName(): string;
    getShortDisplayName(): string;
    isActiveDepartmentType(): boolean;
}
