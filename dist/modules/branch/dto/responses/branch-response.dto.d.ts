import { HospitalLevel } from '../commands/create-branch.dto';
export declare class ProvinceInfoDto {
    id: string;
    provinceCode: string;
    provinceName: string;
    shortName: string;
}
export declare class WardInfoDto {
    id: string;
    wardCode: string;
    wardName: string;
    shortName: string;
}
export declare class BranchResponseDto {
    id: string;
    branchCode: string;
    branchName: string;
    shortName: string;
    provinceId: string;
    wardId: string;
    address: string;
    phoneNumber: string;
    hospitalLevel: HospitalLevel;
    representative: string;
    bhyCode: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    version: number;
    displayName: string;
    fullAddress: string;
    province?: ProvinceInfoDto;
    ward?: WardInfoDto;
}
