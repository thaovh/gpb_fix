import { BaseEntity } from '../../../common/entities/base.entity';
export declare class User extends BaseEntity {
    username: string;
    email: string;
    passwordHash: string;
    fullName: string;
    isActive: boolean;
    phoneNumber?: string;
    dateOfBirth?: Date;
    address?: string;
    profile?: any;
    isAccountActive(): boolean;
    hasProfile(): boolean;
    getProfileData(): any;
}
