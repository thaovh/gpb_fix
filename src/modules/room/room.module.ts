import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ServicesModule } from '../../shared/services/services.module';
import { DataLoaderModule } from '../../shared/dataloaders/dataloader.module';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
        ServicesModule,
        DataLoaderModule,
    ],
    controllers: [RoomController],
    providers: [
        RoomService,
        CurrentUserContextService,
        {
            provide: 'IRoomRepository',
            useClass: RoomRepository,
        },
    ],
    exports: [
        RoomService,
        'IRoomRepository',
    ],
})
export class RoomModule { }
