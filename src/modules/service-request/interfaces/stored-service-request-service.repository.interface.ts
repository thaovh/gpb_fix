import { StoredServiceRequestService } from '../entities/stored-service-request-service.entity';

export interface IStoredServiceRequestServiceRepository {
    findById(id: string): Promise<StoredServiceRequestService | null>;
    save(entity: StoredServiceRequestService): Promise<StoredServiceRequestService>;
}

