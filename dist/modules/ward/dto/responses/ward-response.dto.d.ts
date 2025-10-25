export declare class ProvinceInfoDto {
    id: string;
    provinceCode: string;
    provinceName: string;
    shortName: string;
}
export declare class WardResponseDto {
    id: string;
    wardCode: string;
    wardName: string;
    provinceId: string;
    shortName: string;
    sortOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    version: number;
    displayName: string;
    province?: ProvinceInfoDto;
}
