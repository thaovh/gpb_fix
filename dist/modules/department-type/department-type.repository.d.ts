import { Repository } from 'typeorm';
import { DepartmentType } from './entities/department-type.entity';
import { IDepartmentTypeRepository } from './interfaces/department-type.repository.interface';
export declare class DepartmentTypeRepository implements IDepartmentTypeRepository {
    private readonly departmentTypeRepository;
    constructor(departmentTypeRepository: Repository<DepartmentType>);
    findById(id: string): Promise<DepartmentType | null>;
    findByCode(typeCode: string): Promise<DepartmentType | null>;
    save(departmentType: DepartmentType): Promise<DepartmentType>;
    delete(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
    findAll(): Promise<DepartmentType[]>;
    findActive(): Promise<DepartmentType[]>;
    findInactive(): Promise<DepartmentType[]>;
    findBySortOrder(): Promise<DepartmentType[]>;
    searchByName(name: string): Promise<DepartmentType[]>;
    searchByCode(code: string): Promise<DepartmentType[]>;
    searchByKeyword(keyword: string): Promise<DepartmentType[]>;
    findWithPagination(limit: number, offset: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC', filters?: {
        isActive?: boolean;
        search?: string;
    }): Promise<[DepartmentType[], number]>;
    findByIds(ids: string[]): Promise<DepartmentType[]>;
    saveMany(departmentTypes: DepartmentType[]): Promise<DepartmentType[]>;
    deleteMany(ids: string[]): Promise<void>;
    countTotal(): Promise<number>;
    countActive(): Promise<number>;
    countInactive(): Promise<number>;
    countByStatus(isActive: boolean): Promise<number>;
    existsByCode(typeCode: string, excludeId?: string): Promise<boolean>;
    existsByName(typeName: string, excludeId?: string): Promise<boolean>;
    getNextSortOrder(): Promise<number>;
    getMaxSortOrder(): Promise<number>;
    reorderSortOrder(): Promise<void>;
}
