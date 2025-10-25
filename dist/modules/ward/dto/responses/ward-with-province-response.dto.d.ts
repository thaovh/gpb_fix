import { WardResponseDto } from './ward-response.dto';
export declare class WardWithProvinceResponseDto extends WardResponseDto {
    province: {
        id: string;
        provinceCode: string;
        provinceName: string;
        shortName: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}
