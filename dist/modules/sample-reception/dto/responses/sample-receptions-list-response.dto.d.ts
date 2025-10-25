import { SampleReceptionResponseDto } from './sample-reception-response.dto';
export declare class SampleReceptionsListResponseDto {
    receptions: SampleReceptionResponseDto[];
    total: number;
    limit: number;
    offset: number;
}
