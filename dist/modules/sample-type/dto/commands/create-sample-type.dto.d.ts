export declare class CreateSampleTypeDto {
    typeCode: string;
    typeName: string;
    shortName?: string;
    description?: string;
    sortOrder?: number;
    codePrefix: string;
    codeWidth?: number;
    allowDuplicate?: boolean;
    resetPeriod?: 'DAILY' | 'MONTHLY' | 'YEARLY' | 'NEVER';
}
