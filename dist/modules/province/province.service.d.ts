import { DataSource } from 'typeorm';
import { IProvinceRepository } from './interfaces/province.repository.interface';
import { CreateProvinceDto } from './dto/commands/create-province.dto';
import { UpdateProvinceDto } from './dto/commands/update-province.dto';
import { GetProvincesDto } from './dto/queries/get-provinces.dto';
import { ProvinceResponseDto } from './dto/responses/province-response.dto';
import { DataLoaderService } from '../../shared/dataloaders/dataloader.service';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
export interface GetProvincesResult {
    provinces: ProvinceResponseDto[];
    total: number;
    limit: number;
    offset: number;
}
export declare class ProvinceService extends BaseService {
    private readonly provinceRepository;
    protected readonly dataSource: DataSource;
    private readonly dataLoaderService;
    protected readonly currentUserContext: CurrentUserContextService;
    constructor(provinceRepository: IProvinceRepository, dataSource: DataSource, dataLoaderService: DataLoaderService, currentUserContext: CurrentUserContextService);
    createProvince(createProvinceDto: CreateProvinceDto, currentUser: CurrentUser): Promise<string>;
    updateProvince(id: string, updateProvinceDto: UpdateProvinceDto, currentUser: CurrentUser): Promise<void>;
    deleteProvince(id: string): Promise<void>;
    getProvinceById(id: string): Promise<ProvinceResponseDto>;
    getProvinces(query: GetProvincesDto): Promise<GetProvincesResult>;
    getProvincesWithWards(query: GetProvincesDto): Promise<GetProvincesResult>;
    getProvincesWithBranches(query: GetProvincesDto): Promise<GetProvincesResult>;
    getStatsOverview(): Promise<any>;
    reorderProvinces(provinceIds: string[]): Promise<void>;
    private getNextSortOrder;
    private mapProvinceToResponseDto;
}
