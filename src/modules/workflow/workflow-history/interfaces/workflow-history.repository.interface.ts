import { WorkflowHistory } from '../entities/workflow-history.entity';
import { GetWorkflowHistoryDto } from '../dto/queries/get-workflow-history.dto';

export interface IWorkflowHistoryRepository {
    findById(id: string): Promise<WorkflowHistory | null>;
    findCurrentState(storedServiceReqId: string, storedServiceId?: string | null): Promise<WorkflowHistory | null>;
    findHistory(storedServiceReqId: string, storedServiceId?: string | null): Promise<WorkflowHistory[]>;
    findAll(query: GetWorkflowHistoryDto): Promise<{ items: WorkflowHistory[]; total: number }>;
    findCurrentStatesByServiceReq(storedServiceReqId: string): Promise<WorkflowHistory[]>;
    save(entity: WorkflowHistory): Promise<WorkflowHistory>;
    updateIsCurrent(storedServiceReqId: string, storedServiceId: string | null, isCurrent: number): Promise<void>;
    remove(id: string): Promise<void>;
}

