"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LIS GPB Backend API')
        .setDescription('Backend API for LIS GPB platform - Laboratory Information System for General Practice Business')
        .setVersion('1.0.0')
        .setContact('LIS GPB Team', 'https://github.com/lis-gpb', 'support@lisgpb.com')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addServer('http://localhost:8000', 'Development Server')
        .addServer('https://api.lisgpb.com', 'Production Server')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Authentication', 'User authentication and authorization')
        .addTag('Users', 'User management operations')
        .addTag('Provinces', 'Province management operations')
        .addTag('Wards', 'Ward management operations')
        .addTag('Branches', 'Branch management operations')
        .addTag('Health', 'System health and status checks')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
            docExpansion: 'none',
            defaultModelsExpandDepth: 2,
            defaultModelExpandDepth: 2,
            tryItOutEnabled: true,
            requestInterceptor: (req) => {
                req.headers['Content-Type'] = 'application/json';
                return req;
            },
        },
        customSiteTitle: 'LIS GPB API Documentation',
        customfavIcon: '/favicon.ico',
        customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b82f6; }
      .swagger-ui .scheme-container { background: #f8fafc; padding: 20px; border-radius: 8px; }
    `,
    });
    return document;
}
//# sourceMappingURL=swagger.config.js.map