import { DataSource } from 'typeorm';
import { ISampleTypeRepository } from './interfaces/sample-type.repository.interface';
import { CreateSampleTypeDto } from './dto/commands/create-sample-type.dto';
import { UpdateSampleTypeDto } from './dto/commands/update-sample-type.dto';
import { GetSampleTypesDto } from './dto/queries/get-sample-types.dto';
import { SampleTypeResponseDto } from './dto/responses/sample-type-response.dto';
import { DataLoaderService } from '../../shared/dataloaders/dataloader.service';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
import { CurrentUser } from '../../common/interfaces/current-user.interface';
export interface GetSampleTypesResult {
    sampleTypes: SampleTypeResponseDto[];
    total: number;
    limit: number;
    offset: number;
}
export declare class SampleTypeService extends BaseService {
    private readonly sampleTypeRepository;
    protected readonly dataSource: DataSource;
    protected readonly currentUserContext: CurrentUserContextService;
    private readonly dataLoaderService;
    constructor(sampleTypeRepository: ISampleTypeRepository, dataSource: DataSource, currentUserContext: CurrentUserContextService, dataLoaderService: DataLoaderService);
    createSampleType(createDto: CreateSampleTypeDto, currentUser: CurrentUser): Promise<string>;
    updateSampleType(id: string, updateDto: UpdateSampleTypeDto, currentUser: CurrentUser): Promise<void>;
    deleteSampleType(id: string): Promise<void>;
    getSampleTypeById(id: string): Promise<SampleTypeResponseDto>;
    getSampleTypes(query: GetSampleTypesDto): Promise<GetSampleTypesResult>;
    searchSampleTypes(searchTerm: string): Promise<SampleTypeResponseDto[]>;
    getActiveSampleTypes(): Promise<SampleTypeResponseDto[]>;
    private mapSampleTypeToResponseDto;
}
