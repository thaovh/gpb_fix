import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowHistory } from './entities/workflow-history.entity';
import { WorkflowHistoryController } from './controllers/workflow-history.controller';
import { WorkflowHistoryService } from './services/workflow-history.service';
import { WorkflowHistoryRepository } from './repositories/workflow-history.repository';
import { WorkflowModule } from '../workflow.module'; // Import để lấy IWorkflowStateRepository
import { UserModule } from '../../user/user.module'; // Import để lấy IUserRepository

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkflowHistory]),
        WorkflowModule, // Để access IWorkflowStateRepository
        UserModule, // Để access IUserRepository
    ],
    controllers: [WorkflowHistoryController],
    providers: [
        WorkflowHistoryService,
        {
            provide: 'IWorkflowHistoryRepository',
            useClass: WorkflowHistoryRepository,
        },
    ],
    exports: [WorkflowHistoryService, 'IWorkflowHistoryRepository'],
})
export class WorkflowHistoryModule { }

