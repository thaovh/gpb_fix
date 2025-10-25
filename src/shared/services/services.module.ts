import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { AppLoggerService } from './logger.service';
import { TraceService } from './trace.service';

@Module({
    providers: [PasswordService, AppLoggerService, TraceService],
    exports: [PasswordService, AppLoggerService, TraceService],
})
export class ServicesModule { }
