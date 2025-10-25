import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Like, Between } from 'typeorm';
import { SampleReception } from './entities/sample-reception.entity';
import { ISampleReceptionRepository } from './interfaces/sample-reception.repository.interface';

@Injectable()
export class SampleReceptionRepository implements ISampleReceptionRepository {
    constructor(
        @InjectRepository(SampleReception)
        private readonly sampleReceptionRepository: Repository<SampleReception>,
    ) { }

    async findById(id: string): Promise<SampleReception | null> {
        return this.sampleReceptionRepository.findOne({
            where: { id, deletedAt: IsNull() },
            relations: ['sampleType'],
        });
    }

    async findByCode(receptionCode: string): Promise<SampleReception | null> {
        return this.sampleReceptionRepository.findOne({
            where: { receptionCode, deletedAt: IsNull() },
            relations: ['sampleType'],
        });
    }

    async existsByCode(receptionCode: string): Promise<boolean> {
        return this.sampleReceptionRepository.count({
            where: { receptionCode, deletedAt: IsNull() },
        }).then(count => count > 0);
    }

    async save(sampleReception: SampleReception): Promise<SampleReception> {
        return this.sampleReceptionRepository.save(sampleReception);
    }

    async delete(id: string): Promise<void> {
        await this.sampleReceptionRepository.softDelete(id);
    }

    async findWithPagination(
        limit: number,
        offset: number,
        search?: string,
    ): Promise<[SampleReception[], number]> {
        const queryBuilder = this.sampleReceptionRepository.createQueryBuilder('reception');

        queryBuilder.leftJoinAndSelect('reception.sampleType', 'sampleType');
        queryBuilder.where('reception.deletedAt IS NULL');

        if (search) {
            queryBuilder.andWhere(
                '(reception.receptionCode LIKE :search OR sampleType.typeName LIKE :search)',
                { search: `%${search}%` },
            );
        }

        queryBuilder.orderBy('reception.receptionDate', 'DESC');
        queryBuilder.addOrderBy('reception.sequenceNumber', 'ASC');

        queryBuilder.take(limit);
        queryBuilder.skip(offset);

        return queryBuilder.getManyAndCount();
    }

    async countByDateAndType(sampleTypeCode: string, date: Date): Promise<number> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return this.sampleReceptionRepository
            .createQueryBuilder('reception')
            .leftJoin('reception.sampleType', 'sampleType')
            .where('sampleType.typeCode = :sampleTypeCode', { sampleTypeCode })
            .andWhere('reception.receptionDate BETWEEN :startDate AND :endDate', {
                startDate: startOfDay,
                endDate: endOfDay,
            })
            .andWhere('reception.deletedAt IS NULL')
            .getCount();
    }

    async findTodayReceptions(): Promise<SampleReception[]> {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        return this.sampleReceptionRepository.find({
            where: {
                receptionDate: Between(startOfDay, endOfDay),
                deletedAt: IsNull(),
            },
            relations: ['sampleType'],
            order: { sequenceNumber: 'ASC' },
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<SampleReception[]> {
        return this.sampleReceptionRepository.find({
            where: {
                receptionDate: Between(startDate, endDate),
                deletedAt: IsNull(),
            },
            relations: ['sampleType'],
            order: { receptionDate: 'DESC', sequenceNumber: 'ASC' },
        });
    }

    async getNextSequenceNumber(sampleTypeId: string, date: Date): Promise<number> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const result = await this.sampleReceptionRepository
            .createQueryBuilder('sampleReception')
            .select('MAX(sampleReception.sequenceNumber)', 'maxSequence')
            .where('sampleReception.sampleTypeId = :sampleTypeId', { sampleTypeId })
            .andWhere('sampleReception.receptionDate BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
            .andWhere('sampleReception.deletedAt IS NULL')
            .getRawOne();

        return (result?.maxSequence || 0) + 1;
    }
}
