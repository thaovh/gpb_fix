import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SampleReception } from './entities/sample-reception.entity';
import { ISampleReceptionRepository } from './interfaces/sample-reception.repository.interface';
import { CreateSampleReceptionDto } from './dto/commands/create-sample-reception.dto';
import { GetSampleReceptionsDto } from './dto/queries/get-sample-receptions.dto';
import { GenerateCodeDto } from './dto/queries/generate-code.dto';
import { SampleReceptionResponseDto } from './dto/responses/sample-reception-response.dto';
import { GenerateCodeResponseDto } from './dto/responses/generate-code-response.dto';
import { DataLoaderService } from '../../shared/dataloaders/dataloader.service';
import { AppError } from '../../common/errors/app.error';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
import { CurrentUser } from '../../common/interfaces/current-user.interface';
import { ISampleTypeRepository } from '../sample-type/interfaces/sample-type.repository.interface';

export interface GetSampleReceptionsResult {
    receptions: SampleReceptionResponseDto[];
    total: number;
    limit: number;
    offset: number;
}

@Injectable()
export class SampleReceptionService extends BaseService {
    constructor(
        @Inject('ISampleReceptionRepository')
        private readonly sampleReceptionRepository: ISampleReceptionRepository,
        @Inject('ISampleTypeRepository')
        private readonly sampleTypeRepository: ISampleTypeRepository,
        @Inject(DataSource)
        protected readonly dataSource: DataSource,
        @Inject(CurrentUserContextService)
        protected readonly currentUserContext: CurrentUserContextService,
        private readonly dataLoaderService: DataLoaderService,
    ) {
        super(dataSource, currentUserContext);
    }

    // ========== COMMANDS (Write Operations) ==========

    async createSampleReception(createDto: CreateSampleReceptionDto, currentUser: CurrentUser): Promise<string> {
        this.currentUserContext.setCurrentUser(currentUser);

        return this.transactionWithAudit(async (manager) => {
            // 1. Tìm SampleType theo code
            const sampleType = await this.sampleTypeRepository.findByCode(createDto.sampleTypeCode);
            if (!sampleType) {
                throw AppError.notFound('Sample type not found');
            }

            // 2. Sinh mã tiếp nhận
            const receptionCode = await this.generateReceptionCode(sampleType.typeCode, sampleType.id);

            // 3. Tạo record
            const reception = new SampleReception();
            reception.receptionCode = receptionCode;
            reception.sampleTypeId = sampleType.id;
            reception.receptionDate = new Date();
            reception.sequenceNumber = await this.getNextSequenceNumber(sampleType.id);

            reception.createdBy = currentUser.id;
            reception.updatedBy = currentUser.id;

            const savedReception = await manager.save(SampleReception, reception);
            return savedReception.id;
        });
    }

    async deleteSampleReception(id: string): Promise<void> {
        return this.transactionWithAudit(async (manager) => {
            const reception = await this.sampleReceptionRepository.findById(id);
            if (!reception) {
                throw AppError.notFound('Sample reception not found');
            }

            await this.sampleReceptionRepository.delete(id);
        });
    }

    // ========== QUERIES (Read Operations) ==========

    async getSampleReceptionById(id: string): Promise<SampleReceptionResponseDto> {
        const reception = await this.sampleReceptionRepository.findById(id);
        if (!reception) {
            throw AppError.notFound('Sample reception not found');
        }

        return this.mapReceptionToResponseDto(reception);
    }

    async getSampleReceptions(query: GetSampleReceptionsDto): Promise<GetSampleReceptionsResult> {
        const { limit = 10, offset = 0, search, sortBy = 'receptionDate', sortOrder = 'DESC' } = query;

        const [receptions, total] = await this.sampleReceptionRepository.findWithPagination(
            limit,
            offset,
            search
        );

        return {
            receptions: receptions.map(r => this.mapReceptionToResponseDto(r)),
            total,
            limit,
            offset,
        };
    }

    async generateReceptionCode(sampleTypeCode: string, sampleTypeId: string, date?: Date): Promise<string> {
        const targetDate = date || new Date();
        const dateStr = targetDate.toISOString().slice(0, 10).replace(/-/g, '');

        // Lấy số thứ tự tiếp theo cho ngày này
        const nextSequence = await this.getNextSequenceNumber(sampleTypeId, targetDate);

        // Format: BLOOD.20241024.0001
        return `${sampleTypeCode}.${dateStr}.${nextSequence.toString().padStart(4, '0')}`;
    }

    async generateCodePreview(generateDto: GenerateCodeDto): Promise<GenerateCodeResponseDto> {
        const targetDate = generateDto.date ? new Date(generateDto.date) : new Date();
        const dateStr = targetDate.toISOString().slice(0, 10).replace(/-/g, '');

        const nextSequence = await this.getNextSequenceNumber(generateDto.sampleTypeCode, targetDate);
        const receptionCode = `${generateDto.sampleTypeCode}.${dateStr}.${nextSequence.toString().padStart(4, '0')}`;

        return {
            receptionCode,
            sampleTypeCode: generateDto.sampleTypeCode,
            date: dateStr,
            nextSequence,
        };
    }

    async getTodayReceptions(): Promise<SampleReceptionResponseDto[]> {
        const receptions = await this.sampleReceptionRepository.findTodayReceptions();
        return receptions.map(r => this.mapReceptionToResponseDto(r));
    }

    async getReceptionsByDateRange(startDate: Date, endDate: Date): Promise<SampleReceptionResponseDto[]> {
        const receptions = await this.sampleReceptionRepository.findByDateRange(startDate, endDate);
        return receptions.map(r => this.mapReceptionToResponseDto(r));
    }

    // ========== PRIVATE METHODS ==========

    private async getNextSequenceNumber(sampleTypeId: string, date?: Date): Promise<number> {
        const targetDate = date || new Date();
        // Use repository method that properly handles sequence number generation
        return await this.sampleReceptionRepository.getNextSequenceNumber(sampleTypeId, targetDate);
    }

    private mapReceptionToResponseDto(reception: SampleReception): SampleReceptionResponseDto {
        return {
            id: reception.id,
            receptionCode: reception.receptionCode,
            sampleTypeCode: reception.sampleType?.typeCode || '',
            sampleTypeName: reception.sampleType?.typeName || '',
            receptionDate: reception.receptionDate,
            sequenceNumber: reception.sequenceNumber,
            createdAt: reception.createdAt,
            updatedAt: reception.updatedAt,
            createdBy: reception.createdBy,
            updatedBy: reception.updatedBy,
            version: reception.version,
        };
    }
}
