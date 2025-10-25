import { BaseEntity } from '../../../common/entities/base.entity';
export declare class Province extends BaseEntity {
    provinceCode: string;
    provinceName: string;
    shortName: string;
    sortOrder: number;
    isActive: boolean;
    getDisplayName(): string;
    isProvinceActive(): boolean;
    validateProvinceCode(): boolean;
    validateProvinceName(): boolean;
    validateShortName(): boolean;
    toJSON(): {
        id: string;
        provinceCode: string;
        provinceName: string;
        shortName: string;
        sortOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
        updatedBy: string;
        version: number;
    };
}
