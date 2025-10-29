import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceGroup } from './entities/service-group.entity';
import { ServiceGroupService } from './service-group.service';
import { ServiceGroupController } from './service-group.controller';
import { ServiceGroupRepository } from './service-group.repository';
import { DataLoaderModule } from '../../shared/dataloaders/dataloader.module';
import { ServicesModule } from '../../shared/services/services.module';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ServiceGroup]),
        DataLoaderModule,
        ServicesModule,
    ],
    controllers: [ServiceGroupController],
    providers: [
        ServiceGroupService,
        CurrentUserContextService,
        {
            provide: 'IServiceGroupRepository',
            useClass: ServiceGroupRepository,
        },
    ],
    exports: [
        ServiceGroupService,
        'IServiceGroupRepository',
    ],
})
export class ServiceGroupModule {}
