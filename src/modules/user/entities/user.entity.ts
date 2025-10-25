import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('BML_USERS')
export class User extends BaseEntity {
    @Column({ name: 'USERNAME', unique: true })
    username: string;

    @Column({ name: 'EMAIL', unique: true })
    email: string;

    @Column({ name: 'PASSWORD_HASH' })
    passwordHash: string;

    @Column({ name: 'FULL_NAME' })
    fullName: string;

    @Column({ name: 'IS_ACTIVE', default: true })
    isActive: boolean;

    @Column({ name: 'PHONE_NUMBER', nullable: true })
    phoneNumber?: string;

    @Column({ name: 'DATE_OF_BIRTH', type: 'timestamp', nullable: true })
    dateOfBirth?: Date;

    @Column({ name: 'ADDRESS', type: 'varchar2', length: 2000, nullable: true })
    address?: string;

    // Business methods
    isAccountActive(): boolean {
        return this.isActive && !this.deletedAt;
    }
}
