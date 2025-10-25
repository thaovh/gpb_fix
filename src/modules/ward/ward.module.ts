import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { WardRepository } from './ward.repository';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { ProvinceModule } from '../province/province.module';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ward]),
        ProvinceModule, // Import ProvinceModule để sử dụng ProvinceRepository
    ],
    controllers: [WardController],
    providers: [
        WardService,
        CurrentUserContextService,
        {
            provide: 'IWardRepository',
            useClass: WardRepository,
        },
    ],
    exports: [
        WardService,
        'IWardRepository',
    ],
})
export class WardModule { }
