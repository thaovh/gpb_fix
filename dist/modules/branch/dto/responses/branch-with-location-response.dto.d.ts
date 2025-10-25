import { BranchResponseDto } from './branch-response.dto';
export declare class BranchWithLocationResponseDto extends BranchResponseDto {
    province: {
        id: string;
        provinceCode: string;
        provinceName: string;
        shortName: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    ward: {
        id: string;
        wardCode: string;
        wardName: string;
        shortName: string;
        provinceId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    fullAddress: string;
    location: {
        province: string;
        ward: string;
        address: string;
        fullAddress: string;
    };
}
