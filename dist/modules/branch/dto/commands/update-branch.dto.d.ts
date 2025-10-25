import { HospitalLevel } from './create-branch.dto';
export declare class UpdateBranchDto {
    branchCode?: string;
    branchName?: string;
    shortName?: string;
    provinceId?: string;
    wardId?: string;
    address?: string;
    phoneNumber?: string;
    hospitalLevel?: HospitalLevel;
    representative?: string;
    bhyCode?: string;
    isActive?: boolean;
}
