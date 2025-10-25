import { DataSource } from 'typeorm';
import { IWardRepository } from './interfaces/ward.repository.interface';
import { IProvinceRepository } from '../province/interfaces/province.repository.interface';
import { CreateWardDto } from './dto/commands/create-ward.dto';
import { UpdateWardDto } from './dto/commands/update-ward.dto';
import { DeleteWardDto } from './dto/commands/delete-ward.dto';
import { GetWardsDto } from './dto/queries/get-wards.dto';
import { GetWardByIdDto } from './dto/queries/get-ward-by-id.dto';
import { SearchWardsDto } from './dto/queries/search-wards.dto';
import { GetWardsByProvinceDto } from './dto/queries/get-wards-by-province.dto';
import { WardResponseDto } from './dto/responses/ward-response.dto';
import { WardsListResponseDto } from './dto/responses/wards-list-response.dto';
import { BaseService } from '../../common/services/base.service';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';
export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
export declare class WardService extends BaseService {
    private readonly wardRepository;
    private readonly provinceRepository;
    constructor(wardRepository: IWardRepository, provinceRepository: IProvinceRepository, dataSource: DataSource, currentUserContext: CurrentUserContextService);
    createWard(createWardDto: CreateWardDto, currentUser: CurrentUser): Promise<string>;
    updateWard(id: string, updateWardDto: UpdateWardDto, currentUser: CurrentUser): Promise<void>;
    deleteWard(deleteWardDto: DeleteWardDto, currentUser: CurrentUser): Promise<void>;
    getWardById(getWardByIdDto: GetWardByIdDto): Promise<WardResponseDto>;
    getWards(getWardsDto: GetWardsDto): Promise<WardsListResponseDto>;
    searchWards(searchWardsDto: SearchWardsDto): Promise<WardsListResponseDto>;
    getWardsByProvince(getWardsByProvinceDto: GetWardsByProvinceDto): Promise<WardsListResponseDto>;
    getWardsStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
    }>;
    getWardsStatsByProvince(provinceId: string): Promise<{
        total: number;
        active: number;
        inactive: number;
    }>;
    reorderWards(provinceId?: string): Promise<void>;
    private mapWardToResponseDto;
}
