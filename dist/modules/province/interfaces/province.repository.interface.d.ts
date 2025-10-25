import { Province } from '../entities/province.entity';
export interface IProvinceRepository {
    findById(id: string): Promise<Province | null>;
    findByCode(provinceCode: string): Promise<Province | null>;
    save(province: Province): Promise<Province>;
    delete(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
    findAll(): Promise<Province[]>;
    findActive(): Promise<Province[]>;
    findInactive(): Promise<Province[]>;
    findBySortOrder(): Promise<Province[]>;
    searchByName(name: string): Promise<Province[]>;
    searchByCode(code: string): Promise<Province[]>;
    searchByShortName(shortName: string): Promise<Province[]>;
    searchByKeyword(keyword: string): Promise<Province[]>;
    findWithPagination(limit: number, offset: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC', filters?: {
        isActive?: boolean;
        search?: string;
    }): Promise<[Province[], number]>;
    findByIds(ids: string[]): Promise<Province[]>;
    saveMany(provinces: Province[]): Promise<Province[]>;
    deleteMany(ids: string[]): Promise<void>;
    countTotal(): Promise<number>;
    countActive(): Promise<number>;
    countInactive(): Promise<number>;
    countByStatus(isActive: boolean): Promise<number>;
    existsByCode(provinceCode: string, excludeId?: string): Promise<boolean>;
    existsByName(provinceName: string, excludeId?: string): Promise<boolean>;
    existsByShortName(shortName: string, excludeId?: string): Promise<boolean>;
    getNextSortOrder(): Promise<number>;
    getMaxSortOrder(): Promise<number>;
    reorderSortOrder(): Promise<void>;
}
