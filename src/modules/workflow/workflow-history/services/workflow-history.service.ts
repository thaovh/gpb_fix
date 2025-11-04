import { BadRequestException, ConflictException, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IWorkflowHistoryRepository } from '../interfaces/workflow-history.repository.interface';
import { IWorkflowStateRepository } from '../../interfaces/workflow-state.repository.interface';
import { IUserRepository } from '../../../user/interfaces/user.repository.interface';
import { StartWorkflowDto } from '../dto/commands/start-workflow.dto';
import { TransitionStateDto } from '../dto/commands/transition-state.dto';
import { UpdateCurrentStateDto } from '../dto/commands/update-current-state.dto';
import { GetWorkflowHistoryDto } from '../dto/queries/get-workflow-history.dto';
import { WorkflowHistory } from '../entities/workflow-history.entity';
import { WorkflowHistoryResponseDto, GetWorkflowHistoryResult } from '../dto/responses/workflow-history-response.dto';
import { CurrentUser } from '../../../../common/interfaces/current-user.interface';

@Injectable()
export class WorkflowHistoryService {
    constructor(
        @Inject('IWorkflowHistoryRepository')
        private readonly workflowHistoryRepo: IWorkflowHistoryRepository,
        @Inject('IWorkflowStateRepository')
        private readonly workflowStateRepo: IWorkflowStateRepository,
        @Inject('IUserRepository')
        private readonly userRepo: IUserRepository,
        private readonly dataSource: DataSource,
    ) { }

    // ========== COMMANDS (Write Operations) ==========

    /**
     * Bắt đầu workflow mới
     */
    async startWorkflow(dto: StartWorkflowDto, currentUser: CurrentUser): Promise<string> {
        return this.dataSource.transaction(async (manager) => {
            // Kiểm tra đã có workflow đang chạy chưa
            const existingCurrent = await this.workflowHistoryRepo.findCurrentState(
                dto.storedServiceReqId,
                dto.storedServiceId || null
            );

            if (existingCurrent) {
                throw new ConflictException('Workflow đã được khởi tạo cho Service Request này');
            }

            // Validate state
            const toState = await this.workflowStateRepo.findById(dto.toStateId);
            if (!toState) {
                throw new NotFoundException('Workflow state không tồn tại');
            }

            // Lấy username
            const user = await this.userRepo.findById(currentUser.id);
            const username = user?.username || currentUser.username || '';

            // Tạo workflow history record mới
            const workflowHistory = new WorkflowHistory();
            workflowHistory.storedServiceReqId = dto.storedServiceReqId;
            workflowHistory.storedServiceId = dto.storedServiceId || null;
            workflowHistory.fromStateId = null; // START không có from state
            workflowHistory.toStateId = dto.toStateId;
            workflowHistory.previousStateId = null;
            workflowHistory.startedAt = new Date();
            workflowHistory.actionTimestamp = new Date();
            workflowHistory.currentStateStartedAt = new Date();
            workflowHistory.actionType = 'START';
            workflowHistory.actionUserId = currentUser.id;
            workflowHistory.actionUsername = username;
            workflowHistory.actionDepartmentId = currentUser.id; // Có thể lấy từ profile sau
            workflowHistory.actionRoomId = null;
            workflowHistory.currentUserId = dto.currentUserId || null;
            workflowHistory.currentDepartmentId = dto.currentDepartmentId || null;
            workflowHistory.currentRoomId = dto.currentRoomId || null;
            workflowHistory.transitionedByUserId = currentUser.id;
            workflowHistory.transitionedByDepartmentId = dto.currentDepartmentId || null;
            workflowHistory.transitionedByRoomId = dto.currentRoomId || null;
            workflowHistory.isCurrent = 1; // Current state
            workflowHistory.isActive = 1;
            workflowHistory.isCompleted = 0;
            workflowHistory.notes = dto.notes || null;
            workflowHistory.estimatedCompletionTime = dto.estimatedCompletionTime
                ? new Date(dto.estimatedCompletionTime)
                : null;
            workflowHistory.createdBy = currentUser.id;
            workflowHistory.updatedBy = currentUser.id;

            const saved = await manager.save(WorkflowHistory, workflowHistory);
            return saved.id;
        });
    }

    /**
     * Chuyển workflow sang state mới
     */
    async transitionState(dto: TransitionStateDto, currentUser: CurrentUser): Promise<string> {
        return this.dataSource.transaction(async (manager) => {
            // Tìm current state
            const currentState = await this.workflowHistoryRepo.findCurrentState(
                dto.storedServiceReqId,
                dto.storedServiceId || null
            );

            if (!currentState) {
                throw new NotFoundException('Không tìm thấy workflow đang chạy cho Service Request này');
            }

            // Validate new state
            const toState = await this.workflowStateRepo.findById(dto.toStateId);
            if (!toState) {
                throw new NotFoundException('Workflow state đích không tồn tại');
            }

            // Kiểm tra không thể chuyển về state cũ trừ khi là ROLLBACK
            if (dto.actionType !== 'ROLLBACK' && dto.toStateId === currentState.toStateId) {
                throw new BadRequestException('Không thể chuyển sang trạng thái hiện tại');
            }

            // Tính duration từ state cũ
            const durationMinutes = currentState.currentStateStartedAt
                ? Math.round((new Date().getTime() - currentState.currentStateStartedAt.getTime()) / (1000 * 60))
                : null;

            // Lấy username
            const user = await this.userRepo.findById(currentUser.id);
            const username = user?.username || currentUser.username || '';

            // 1. UPDATE record cũ: set IS_CURRENT = 0, update duration
            currentState.isCurrent = 0;
            currentState.durationMinutes = durationMinutes;
            currentState.updatedBy = currentUser.id;
            await manager.save(WorkflowHistory, currentState);

            // 2. Tạo record mới với IS_CURRENT = 1
            const newState = new WorkflowHistory();
            newState.storedServiceReqId = dto.storedServiceReqId;
            newState.storedServiceId = dto.storedServiceId || null;
            newState.fromStateId = currentState.toStateId; // Từ state cũ
            newState.toStateId = dto.toStateId; // Đến state mới
            newState.previousStateId = currentState.toStateId;
            newState.startedAt = currentState.startedAt; // Giữ nguyên started_at từ record đầu
            newState.actionTimestamp = new Date();
            newState.currentStateStartedAt = new Date();
            newState.durationMinutes = null; // Sẽ được tính khi chuyển state tiếp
            newState.actionType = dto.actionType;
            newState.actionUserId = currentUser.id;
            newState.actionUsername = username;
            newState.actionDepartmentId = dto.currentDepartmentId || null;
            newState.actionRoomId = dto.currentRoomId || null;
            newState.currentUserId = dto.currentUserId || null;
            newState.currentDepartmentId = dto.currentDepartmentId || null;
            newState.currentRoomId = dto.currentRoomId || null;
            newState.transitionedByUserId = currentUser.id;
            newState.transitionedByDepartmentId = dto.currentDepartmentId || null;
            newState.transitionedByRoomId = dto.currentRoomId || null;
            newState.isCurrent = 1; // Current state
            newState.isActive = 1;
            newState.isCompleted = dto.toStateId === (await this.getCompletedStateId()) ? 1 : 0; // Check nếu là state hoàn thành
            newState.notes = dto.notes || null;
            newState.estimatedCompletionTime = dto.estimatedCompletionTime
                ? new Date(dto.estimatedCompletionTime)
                : null;
            newState.attachmentUrl = dto.attachmentUrl || null;
            newState.createdBy = currentUser.id;
            newState.updatedBy = currentUser.id;

            // Set completed_at nếu workflow đã hoàn thành
            if (newState.isCompleted === 1) {
                newState.completedAt = new Date();
            }

            const saved = await manager.save(WorkflowHistory, newState);
            return saved.id;
        });
    }

    /**
     * Cập nhật thông tin current state (không chuyển state)
     */
    async updateCurrentState(
        storedServiceReqId: string,
        storedServiceId: string | null,
        dto: UpdateCurrentStateDto,
        currentUser: CurrentUser
    ): Promise<void> {
        return this.dataSource.transaction(async (manager) => {
            const currentState = await this.workflowHistoryRepo.findCurrentState(
                storedServiceReqId,
                storedServiceId
            );

            if (!currentState) {
                throw new NotFoundException('Không tìm thấy workflow đang chạy');
            }

            if (dto.currentUserId !== undefined) {
                currentState.currentUserId = dto.currentUserId || null;
            }
            if (dto.currentDepartmentId !== undefined) {
                currentState.currentDepartmentId = dto.currentDepartmentId || null;
            }
            if (dto.currentRoomId !== undefined) {
                currentState.currentRoomId = dto.currentRoomId || null;
            }
            if (dto.estimatedCompletionTime !== undefined) {
                currentState.estimatedCompletionTime = dto.estimatedCompletionTime
                    ? new Date(dto.estimatedCompletionTime)
                    : null;
            }
            if (dto.notes !== undefined) {
                currentState.notes = dto.notes || null;
            }

            currentState.updatedBy = currentUser.id;
            await manager.save(WorkflowHistory, currentState);
        });
    }

    // ========== QUERIES (Read Operations) ==========

    /**
     * Lấy current state của workflow
     */
    async getCurrentState(storedServiceReqId: string, storedServiceId?: string | null): Promise<WorkflowHistoryResponseDto> {
        const currentState = await this.workflowHistoryRepo.findCurrentState(storedServiceReqId, storedServiceId);
        if (!currentState) {
            throw new NotFoundException('Không tìm thấy workflow đang chạy');
        }
        return this.mapToResponseDto(currentState);
    }

    /**
     * Lấy lịch sử workflow
     */
    async getHistory(storedServiceReqId: string, storedServiceId?: string | null): Promise<WorkflowHistoryResponseDto[]> {
        const history = await this.workflowHistoryRepo.findHistory(storedServiceReqId, storedServiceId);
        return history.map(item => this.mapToResponseDto(item));
    }

    /**
     * Lấy tất cả current states của một Service Request
     */
    async getCurrentStatesByServiceReq(storedServiceReqId: string): Promise<WorkflowHistoryResponseDto[]> {
        const states = await this.workflowHistoryRepo.findCurrentStatesByServiceReq(storedServiceReqId);
        return states.map(item => this.mapToResponseDto(item));
    }

    /**
     * Lấy danh sách workflow history với filter
     */
    async getAll(query: GetWorkflowHistoryDto): Promise<GetWorkflowHistoryResult> {
        const { items, total } = await this.workflowHistoryRepo.findAll(query);
        return {
            items: items.map(item => this.mapToResponseDto(item)),
            total,
            limit: query.limit ?? 10,
            offset: query.offset ?? 0,
        };
    }

    /**
     * Lấy workflow history theo ID
     */
    async getById(id: string): Promise<WorkflowHistoryResponseDto> {
        const workflowHistory = await this.workflowHistoryRepo.findById(id);
        if (!workflowHistory) {
            throw new NotFoundException('Workflow history không tìm thấy');
        }
        return this.mapToResponseDto(workflowHistory);
    }

    // ========== PRIVATE METHODS ==========

    private async getCompletedStateId(): Promise<string | null> {
        const completedState = await this.workflowStateRepo.findByCode('COMPLETED');
        return completedState?.id || null;
    }

    private mapToResponseDto(entity: WorkflowHistory): WorkflowHistoryResponseDto {
        return {
            id: entity.id,
            storedServiceReqId: entity.storedServiceReqId,
            storedServiceId: entity.storedServiceId,
            fromStateId: entity.fromStateId,
            toStateId: entity.toStateId,
            previousStateId: entity.previousStateId,
            startedAt: entity.startedAt,
            actionTimestamp: entity.actionTimestamp,
            currentStateStartedAt: entity.currentStateStartedAt,
            completedAt: entity.completedAt,
            estimatedCompletionTime: entity.estimatedCompletionTime,
            durationMinutes: entity.durationMinutes,
            actionType: entity.actionType,
            actionUserId: entity.actionUserId,
            actionUsername: entity.actionUsername,
            actionDepartmentId: entity.actionDepartmentId,
            actionRoomId: entity.actionRoomId,
            currentUserId: entity.currentUserId,
            currentDepartmentId: entity.currentDepartmentId,
            currentRoomId: entity.currentRoomId,
            transitionedByUserId: entity.transitionedByUserId,
            transitionedByDepartmentId: entity.transitionedByDepartmentId,
            transitionedByRoomId: entity.transitionedByRoomId,
            isCurrent: entity.isCurrent,
            isActive: entity.isActive,
            isCompleted: entity.isCompleted,
            notes: entity.notes,
            attachmentUrl: entity.attachmentUrl,
            metadata: entity.metadata,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            version: entity.version,
        };
    }
}

