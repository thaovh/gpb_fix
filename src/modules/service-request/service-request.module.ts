import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequestService } from './services/service-request.service';
import { ServiceRequestController } from './controllers/service-request.controller';
import { ServiceRequestView } from './entities/service-request-view.entity';
import { ServiceRequestRepository } from './repositories/service-request.repository';
import { HisDatabaseModule } from '../his-database/his-database.module';
import { Department } from '../department/entities/department.entity';
import { Room } from '../room/entities/room.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Province } from '../province/entities/province.entity';
import { Ward } from '../ward/entities/ward.entity';
import { Service } from '../service/entities/service.entity';

@Module({
    imports: [
        HisDatabaseModule,
        TypeOrmModule.forFeature(
            [ServiceRequestView],
            'hisConnection' // Use HIS database connection
        ),
        TypeOrmModule.forFeature([Department, Room, Patient, Province, Ward, Service]),
    ],
    controllers: [ServiceRequestController],
    providers: [
        ServiceRequestService,
        {
            provide: 'IServiceRequestRepository',
            useClass: ServiceRequestRepository,
        },
    ],
    exports: [ServiceRequestService],
})
export class ServiceRequestModule { }
