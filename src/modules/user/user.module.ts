import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ServicesModule } from '../../shared/services/services.module';
import { CurrentUserContextService } from '../../common/services/current-user-context.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ServicesModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        CurrentUserContextService,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },
    ],
    exports: [UserService, 'IUserRepository'],
})
export class UserModule { }
