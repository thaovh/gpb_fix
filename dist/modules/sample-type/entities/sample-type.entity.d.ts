import { BaseEntity } from '../../../common/entities/base.entity';
export declare class SampleType extends BaseEntity {
    typeCode: string;
    typeName: string;
    shortName?: string;
    description?: string;
    sortOrder: number;
    getDisplayName(): string;
}
