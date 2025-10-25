import { DataSource, EntityTarget } from 'typeorm';
import { CurrentUserContextService } from './current-user-context.service';
export declare abstract class BaseService {
    protected readonly dataSource: DataSource;
    protected readonly currentUserContext: CurrentUserContextService;
    constructor(dataSource: DataSource, currentUserContext: CurrentUserContextService);
    protected saveWithAudit<T>(entity: T, entityClass: EntityTarget<T>, isUpdate?: boolean): Promise<T>;
    protected transactionWithAudit<T>(runInTransaction: (manager: any) => Promise<T>): Promise<T>;
    protected setAuditFields(entity: any, isUpdate?: boolean): void;
}
