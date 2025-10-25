import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ServicesModule } from '../../shared/services/services.module';

@Module({
    imports: [
        UserModule,
        ServicesModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-super-secret-key-here',
            signOptions: {
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
                issuer: 'lis-gpb-backend',
                audience: 'lis-gpb-users',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy],
})
export class AuthModule { }
