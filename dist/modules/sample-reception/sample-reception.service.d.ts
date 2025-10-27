import { DataSource } from 'typeorm';
import { ISampleReceptionRepository } from './interfaces/sample-reception.repository.interface';
import { CreateSampleReceptionDto } from './dto/commands/create-sample-reception.dto';
import { GetSampleReceptionsDto } from './dto/queries/get-sample-receptions.dto';
import { GenerateCodeDto } from './dto/queries/generate-code.dto';
import { SampleReceptionResponseDto } from './dto/responses/sample-reception-response.dto';
import { GenerateCodeResponseDto } from './dto/responses/generate-code-response.dto';
import { DataLoaderService } from '../../shared/dataloaders/dataloader.service';
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
export declare class SampleReceptionService extends BaseService {
    private readonly sampleReceptionRepository;
    private readonly sampleTypeRepository;
    protected readonly dataSource: DataSource;
    protected readonly currentUserContext: CurrentUserContextService;
    private readonly dataLoaderService;
    constructor(sampleReceptionRepository: ISampleReceptionRepository, sampleTypeRepository: ISampleTypeRepository, dataSource: DataSource, currentUserContext: CurrentUserContextService, dataLoaderService: DataLoaderService);
    createSampleReception(createDto: CreateSampleReceptionDto, currentUser: CurrentUser): Promise<string>;
    deleteSampleReception(id: string): Promise<void>;
    getSampleReceptionById(id: string): Promise<SampleReceptionResponseDto>;
    getSampleReceptions(query: GetSampleReceptionsDto): Promise<GetSampleReceptionsResult>;
    generateReceptionCode(sampleTypeCode: string, sampleTypeId: string, date?: Date): Promise<string>;
    generateCodePreview(generateDto: GenerateCodeDto): Promise<GenerateCodeResponseDto>;
    getTodayReceptions(): Promise<SampleReceptionResponseDto[]>;
    getReceptionsByDateRange(startDate: Date, endDate: Date): Promise<SampleReceptionResponseDto[]>;
    getCodeGenerationConfig(sampleTypeId: string): Promise<any>;
    private getNextSequenceNumber;
    private formatDateByResetPeriod;
    private mapReceptionToResponseDto;
}
