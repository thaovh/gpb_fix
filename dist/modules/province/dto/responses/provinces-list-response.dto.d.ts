import { ProvinceResponseDto } from './province-response.dto';
export declare class ProvincePaginationDto {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalPages: number;
    currentPage: number;
}
export declare class ProvincesListResponseDto {
    provinces: ProvinceResponseDto[];
    pagination: ProvincePaginationDto;
    statistics: {
        total: number;
        active: number;
        inactive: number;
    };
}
