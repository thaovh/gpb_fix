"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_builder_1 = require("./common/builders/response.builder");
let HealthController = class HealthController {
    healthCheck() {
        return response_builder_1.ResponseBuilder.success({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
        });
    }
    readinessCheck() {
        return response_builder_1.ResponseBuilder.success({
            status: 'ready',
            timestamp: new Date().toISOString(),
            services: {
                database: 'connected',
                redis: 'connected',
            },
        });
    }
    apiInfo() {
        return response_builder_1.ResponseBuilder.success({
            name: 'LIS GPB Backend API',
            version: '1.0.0',
            description: 'Backend API for LIS GPB platform',
            endpoints: {
                auth: {
                    login: 'POST /api/v1/auth/login',
                    register: 'POST /api/v1/auth/register',
                },
                users: {
                    list: 'GET /api/v1/users',
                    get: 'GET /api/v1/users/:id',
                    create: 'POST /api/v1/users',
                    update: 'PUT /api/v1/users/:id',
                    delete: 'DELETE /api/v1/users/:id',
                    activate: 'PATCH /api/v1/users/:id/activate',
                },
                health: {
                    health: 'GET /api/v1/health',
                    ready: 'GET /api/v1/ready',
                },
            },
            documentation: 'http://localhost:3000/api/v1',
        });
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({
        summary: 'Health check',
        description: 'Check the health status of the application'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Application is healthy',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                status_code: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'healthy' },
                        timestamp: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
                        uptime: { type: 'number', example: 3600 },
                        environment: { type: 'string', example: 'development' }
                    }
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('ready'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "readinessCheck", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "apiInfo", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)()
], HealthController);
//# sourceMappingURL=health.controller.js.map