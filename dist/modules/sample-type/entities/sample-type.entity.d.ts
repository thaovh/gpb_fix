import { BaseEntity } from '../../../common/entities/base.entity';
export declare class SampleType extends BaseEntity {
    typeCode: string;
    typeName: string;
    shortName?: string;
    description?: string;
    sortOrder: number;
    codePrefix: string;
    codeWidth: number;
    allowDuplicate: boolean;
    resetPeriod: 'DAILY' | 'MONTHLY' | 'YEARLY' | 'NEVER';
    getDisplayName(): string;
    getCodeGenerationInfo(): string;
}
