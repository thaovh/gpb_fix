import { Repository } from 'typeorm';
import { SampleType } from './entities/sample-type.entity';
import { ISampleTypeRepository } from './interfaces/sample-type.repository.interface';
export declare class SampleTypeRepository implements ISampleTypeRepository {
    private readonly sampleTypeRepository;
    constructor(sampleTypeRepository: Repository<SampleType>);
    findById(id: string): Promise<SampleType | null>;
    findByCode(typeCode: string): Promise<SampleType | null>;
    existsByCode(typeCode: string): Promise<boolean>;
    existsByName(typeName: string): Promise<boolean>;
    save(sampleType: SampleType): Promise<SampleType>;
    delete(id: string): Promise<void>;
    findWithPagination(limit: number, offset: number, search?: string): Promise<[SampleType[], number]>;
    findActiveWithSorting(): Promise<SampleType[]>;
    getNextSortOrder(): Promise<number>;
}
