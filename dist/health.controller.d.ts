export declare class HealthController {
    healthCheck(): import("./common/builders/response.builder").BaseResponse<{
        status: string;
        timestamp: string;
        uptime: number;
        environment: string;
    }>;
    readinessCheck(): import("./common/builders/response.builder").BaseResponse<{
        status: string;
        timestamp: string;
        services: {
            database: string;
            redis: string;
        };
    }>;
    apiInfo(): import("./common/builders/response.builder").BaseResponse<{
        name: string;
        version: string;
        description: string;
        endpoints: {
            auth: {
                login: string;
                register: string;
            };
            users: {
                list: string;
                get: string;
                create: string;
                update: string;
                delete: string;
                activate: string;
            };
            health: {
                health: string;
                ready: string;
            };
        };
        documentation: string;
    }>;
}
