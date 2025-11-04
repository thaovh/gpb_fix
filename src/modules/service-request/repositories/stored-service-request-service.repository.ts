import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { StoredServiceRequestService } from '../entities/stored-service-request-service.entity';
import { IStoredServiceRequestServiceRepository } from '../interfaces/stored-service-request-service.repository.interface';

@Injectable()
export class StoredServiceRequestServiceRepository implements IStoredServiceRequestServiceRepository {
    constructor(
        @InjectRepository(StoredServiceRequestService)
        private readonly repo: Repository<StoredServiceRequestService>,
    ) { }

    async findById(id: string): Promise<StoredServiceRequestService | null> {
        return this.repo.findOne({
            where: { id, deletedAt: IsNull() },
        });
    }

    async save(entity: StoredServiceRequestService): Promise<StoredServiceRequestService> {
        return this.repo.save(entity);
    }
}

