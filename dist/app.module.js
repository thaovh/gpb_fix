"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const axios_1 = require("@nestjs/axios");
const database_config_1 = require("./config/database.config");
const jwt_config_1 = require("./config/jwt.config");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const province_module_1 = require("./modules/province/province.module");
const ward_module_1 = require("./modules/ward/ward.module");
const branch_module_1 = require("./modules/branch/branch.module");
const department_type_module_1 = require("./modules/department-type/department-type.module");
const department_module_1 = require("./modules/department/department.module");
const room_group_module_1 = require("./modules/room-group/room-group.module");
const room_module_1 = require("./modules/room/room.module");
const sample_type_module_1 = require("./modules/sample-type/sample-type.module");
const sample_reception_module_1 = require("./modules/sample-reception/sample-reception.module");
const patient_module_1 = require("./modules/patient/patient.module");
const service_group_module_1 = require("./modules/service-group/service-group.module");
const profile_module_1 = require("./modules/profile/profile.module");
const user_room_module_1 = require("./modules/user-room/user-room.module");
const health_controller_1 = require("./health.controller");
const dataloader_module_1 = require("./shared/dataloaders/dataloader.module");
const services_module_1 = require("./shared/services/services.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot(database_config_1.databaseConfig),
            jwt_1.JwtModule.registerAsync(jwt_config_1.jwtConfig),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            axios_1.HttpModule.register({
                timeout: 30000,
                maxRedirects: 5,
            }),
            dataloader_module_1.DataLoaderModule,
            services_module_1.ServicesModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            province_module_1.ProvinceModule,
            ward_module_1.WardModule,
            branch_module_1.BranchModule,
            department_type_module_1.DepartmentTypeModule,
            department_module_1.DepartmentModule,
            room_group_module_1.RoomGroupModule,
            room_module_1.RoomModule,
            sample_type_module_1.SampleTypeModule,
            sample_reception_module_1.SampleReceptionModule,
            patient_module_1.PatientModule,
            service_group_module_1.ServiceGroupModule,
            profile_module_1.ProfileModule,
            user_room_module_1.UserRoomModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map