import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('BML_SAMPLE_TYPES')
export class SampleType extends BaseEntity {
    @Column({ name: 'TYPE_CODE', unique: true })
    typeCode: string;

    @Column({ name: 'TYPE_NAME' })
    typeName: string;

    @Column({ name: 'SHORT_NAME', nullable: true })
    shortName?: string;

    @Column({ name: 'DESCRIPTION', type: 'varchar2', length: 2000, nullable: true })
    description?: string;

    @Column({ name: 'SORT_ORDER', type: 'number', default: 0 })
    sortOrder: number;

    // Business methods
    getDisplayName(): string {
        return `${this.typeCode} - ${this.typeName}`;
    }
}
