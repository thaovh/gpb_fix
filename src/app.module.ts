import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Config
import { databaseConfig } from './config/database.config';
import { jwtConfig } from './config/jwt.config';

// Modules
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProvinceModule } from './modules/province/province.module';
import { WardModule } from './modules/ward/ward.module';
import { BranchModule } from './modules/branch/branch.module';
import { DepartmentTypeModule } from './modules/department-type/department-type.module';
import { DepartmentModule } from './modules/department/department.module';
import { RoomGroupModule } from './modules/room-group/room-group.module';
import { RoomModule } from './modules/room/room.module';
import { SampleTypeModule } from './modules/sample-type/sample-type.module';
import { SampleReceptionModule } from './modules/sample-reception/sample-reception.module';
import { HealthController } from './health.controller';

// Shared
import { DataLoaderModule } from './shared/dataloaders/dataloader.module';
import { ServicesModule } from './shared/services/services.module';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Database
        TypeOrmModule.forRoot(databaseConfig),

        // JWT
        JwtModule.registerAsync(jwtConfig),

        // Passport
        PassportModule.register({ defaultStrategy: 'jwt' }),

        // Shared modules
        DataLoaderModule,
        ServicesModule,

        // Feature modules
        UserModule,
        AuthModule,
        ProvinceModule,
        WardModule,
        BranchModule,
        DepartmentTypeModule,
        DepartmentModule,
        RoomGroupModule,
        RoomModule,
        SampleTypeModule,
        SampleReceptionModule,
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule { }
