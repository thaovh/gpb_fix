import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleType } from './entities/sample-type.entity';
import { SampleTypeRepository } from './sample-type.repository';
import { SampleTypeService } from './sample-type.service';
import { SampleTypeController } from './sample-type.controller';
import { ServicesModule } from '../../shared/services/services.module';
import { DataLoaderModule } from '../../shared/dataloaders/dataloader.module';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SampleType]),
        ServicesModule,
        DataLoaderModule,
    ],
    controllers: [SampleTypeController],
    providers: [
        SampleTypeService,
        CurrentUserContextService,
        {
            provide: 'ISampleTypeRepository',
            useClass: SampleTypeRepository,
        },
    ],
    exports: [
        SampleTypeService,
        'ISampleTypeRepository',
    ],
})
export class SampleTypeModule { }
