import { DataSource } from 'typeorm';
import { IDepartmentTypeRepository } from './interfaces/department-type.repository.interface';
import { CreateDepartmentTypeDto } from './dto/commands/create-department-type.dto';
import { UpdateDepartmentTypeDto } from './dto/commands/update-department-type.dto';
import { GetDepartmentTypesDto } from './dto/queries/get-department-types.dto';
import { DepartmentTypeResponseDto } from './dto/responses/department-type-response.dto';
import { DataLoaderService } from '../../shared/dataloaders/dataloader.service';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
export interface GetDepartmentTypesResult {
    departmentTypes: DepartmentTypeResponseDto[];
    total: number;
    limit: number;
    offset: number;
}
export declare class DepartmentTypeService extends BaseService {
    private readonly departmentTypeRepository;
    protected readonly dataSource: DataSource;
    private readonly dataLoaderService;
    protected readonly currentUserContext: CurrentUserContextService;
    constructor(departmentTypeRepository: IDepartmentTypeRepository, dataSource: DataSource, dataLoaderService: DataLoaderService, currentUserContext: CurrentUserContextService);
    createDepartmentType(createDto: CreateDepartmentTypeDto, currentUser: CurrentUser): Promise<string>;
    updateDepartmentType(id: string, updateDto: UpdateDepartmentTypeDto, currentUser: CurrentUser): Promise<void>;
    deleteDepartmentType(id: string, hardDelete?: boolean): Promise<void>;
    getDepartmentTypeById(id: string): Promise<DepartmentTypeResponseDto>;
    getDepartmentTypes(query: GetDepartmentTypesDto): Promise<GetDepartmentTypesResult>;
    getDepartmentTypesWithStats(query: GetDepartmentTypesDto): Promise<GetDepartmentTypesResult>;
    getStatsOverview(): Promise<any>;
    reorderDepartmentTypes(departmentTypeIds: string[]): Promise<void>;
    private getNextSortOrder;
    private mapDepartmentTypeToResponseDto;
}
