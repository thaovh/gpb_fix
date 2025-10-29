import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './service.repository';
import { DataLoaderModule } from '../../shared/dataloaders/dataloader.module';
import { ServicesModule } from '../../common/services/services.module';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Service]),
        DataLoaderModule,
        ServicesModule,
    ],
    controllers: [ServiceController],
    providers: [
        ServiceService,
        {
            provide: 'IServiceRepository',
            useClass: ServiceRepository,
        },
        ServiceRepository,
        CurrentUserContextService,
    ],
    exports: [ServiceService, 'IServiceRepository'],
})
export class ServiceModule { }
