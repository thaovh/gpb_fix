import { BaseEntity } from '../../../common/entities/base.entity';
import { Province } from '../../province/entities/province.entity';
export declare class Ward extends BaseEntity {
    wardCode: string;
    wardName: string;
    provinceId: string;
    shortName: string;
    sortOrder: number;
    isActive: boolean;
    province: Province;
    getDisplayName(): string;
    isWardActive(): boolean;
    validateWardCode(): boolean;
    validateWardName(): boolean;
    validateShortName(): boolean;
    toJSON(): {
        id: string;
        wardCode: string;
        wardName: string;
        provinceId: string;
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
