export declare enum HospitalLevel {
    TUYEN_1 = "Tuy\u1EBFn 1",
    TUYEN_2 = "Tuy\u1EBFn 2",
    TUYEN_3 = "Tuy\u1EBFn 3",
    TUYEN_4 = "Tuy\u1EBFn 4"
}
export declare class CreateBranchDto {
    branchCode?: string;
    branchName: string;
    shortName: string;
    provinceId: string;
    wardId: string;
    address: string;
    phoneNumber: string;
    hospitalLevel: HospitalLevel;
    representative: string;
    bhyCode: string;
    isActive?: boolean;
}
