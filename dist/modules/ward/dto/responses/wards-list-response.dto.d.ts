import { WardResponseDto } from './ward-response.dto';
export declare class WardPaginationDto {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalPages: number;
    currentPage: number;
}
export declare class WardsListResponseDto {
    wards: WardResponseDto[];
    pagination: WardPaginationDto;
    statistics: {
        total: number;
        active: number;
        inactive: number;
        byProvince?: {
            [provinceId: string]: number;
        };
    };
}
