import { BaseEntity } from '../../../common/entities/base.entity';
import { SampleType } from '../../sample-type/entities/sample-type.entity';
export declare class SampleReception extends BaseEntity {
    receptionCode: string;
    sampleTypeId: string;
    receptionDate: Date;
    sequenceNumber: number;
    sampleType: SampleType;
    getFormattedCode(): string;
    getDateString(): string;
}
