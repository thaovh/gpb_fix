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
exports.AppLoggerService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let AppLoggerService = class AppLoggerService {
    constructor() {
        this.serviceName = 'lis-gpb-backend';
        this.version = process.env.npm_package_version || '1.0.0';
        this.environment = process.env.NODE_ENV || 'development';
        this.logDir = process.env.LOG_DIR || 'logs';
        this.maxFileSize = parseInt(process.env.LOG_MAX_FILE_SIZE || '10485760');
        this.maxFiles = parseInt(process.env.LOG_MAX_FILES || '5');
        this.ensureLogDirectory();
    }
    ensureLogDirectory() {
        if (!(0, fs_1.existsSync)(this.logDir)) {
            (0, fs_1.mkdirSync)(this.logDir, { recursive: true });
        }
    }
    getLogFileName(level) {
        const date = new Date().toISOString().split('T')[0];
        return (0, path_1.join)(this.logDir, `${this.serviceName}-${level}-${date}.log`);
    }
    formatLogEntry(level, message, context, stack) {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            context,
            stack,
            service: this.serviceName,
            version: this.version,
            environment: this.environment,
        };
    }
    writeToFile(level, logEntry) {
        try {
            const fileName = this.getLogFileName(level);
            const logLine = JSON.stringify(logEntry) + '\n';
            if ((0, fs_1.existsSync)(fileName)) {
                const stats = require('fs').statSync(fileName);
                if (stats.size > this.maxFileSize) {
                    this.rotateLogFile(fileName);
                }
            }
            (0, fs_1.appendFileSync)(fileName, logLine);
        }
        catch (error) {
            console.error('Failed to write to log file:', error);
        }
    }
    rotateLogFile(fileName) {
        try {
            const path = require('path');
            const dir = path.dirname(fileName);
            const ext = path.extname(fileName);
            const base = path.basename(fileName, ext);
            for (let i = this.maxFiles - 1; i > 0; i--) {
                const oldFile = path.join(dir, `${base}.${i}${ext}`);
                const newFile = path.join(dir, `${base}.${i + 1}${ext}`);
                if ((0, fs_1.existsSync)(oldFile)) {
                    require('fs').renameSync(oldFile, newFile);
                }
            }
            const rotatedFile = path.join(dir, `${base}.1${ext}`);
            if ((0, fs_1.existsSync)(fileName)) {
                require('fs').renameSync(fileName, rotatedFile);
            }
        }
        catch (error) {
            console.error('Failed to rotate log file:', error);
        }
    }
    shouldLog(level) {
        const logLevels = ['verbose', 'debug', 'log', 'warn', 'error'];
        const currentLevel = process.env.LOG_LEVEL || 'log';
        const currentIndex = logLevels.indexOf(currentLevel);
        const messageIndex = logLevels.indexOf(level);
        return messageIndex >= currentIndex;
    }
    log(message, context) {
        if (!this.shouldLog('log'))
            return;
        const logEntry = this.formatLogEntry('log', message, context);
        console.log(JSON.stringify(logEntry));
        this.writeToFile('log', logEntry);
    }
    error(message, stack, context) {
        if (!this.shouldLog('error'))
            return;
        const logEntry = this.formatLogEntry('error', message, context, stack);
        console.error(JSON.stringify(logEntry));
        this.writeToFile('error', logEntry);
    }
    warn(message, context) {
        if (!this.shouldLog('warn'))
            return;
        const logEntry = this.formatLogEntry('warn', message, context);
        console.warn(JSON.stringify(logEntry));
        this.writeToFile('warn', logEntry);
    }
    debug(message, context) {
        if (!this.shouldLog('debug'))
            return;
        const logEntry = this.formatLogEntry('debug', message, context);
        console.debug(JSON.stringify(logEntry));
        this.writeToFile('debug', logEntry);
    }
    verbose(message, context) {
        if (!this.shouldLog('verbose'))
            return;
        const logEntry = this.formatLogEntry('verbose', message, context);
        console.log(JSON.stringify(logEntry));
        this.writeToFile('verbose', logEntry);
    }
    logRequest(method, url, context) {
        this.log(`Request: ${method} ${url}`, {
            ...context,
            method,
            url,
            type: 'request',
        });
    }
    logResponse(method, url, statusCode, duration, context) {
        const level = statusCode >= 400 ? 'warn' : 'log';
        const message = `Response: ${method} ${url} - ${statusCode} (${duration}ms)`;
        if (level === 'warn') {
            this.warn(message, {
                ...context,
                method,
                url,
                statusCode,
                duration,
                type: 'response',
            });
        }
        else {
            this.log(message, {
                ...context,
                method,
                url,
                statusCode,
                duration,
                type: 'response',
            });
        }
    }
    logDatabaseQuery(query, duration, context) {
        this.debug(`Database Query: ${query}`, {
            ...context,
            query,
            duration,
            type: 'database',
        });
    }
    logBusinessEvent(event, data, context) {
        this.log(`Business Event: ${event}`, {
            ...context,
            event,
            data,
            type: 'business',
        });
    }
    logSecurityEvent(event, severity, context) {
        const level = severity === 'critical' || severity === 'high' ? 'error' : 'warn';
        const message = `Security Event: ${event} (${severity})`;
        if (level === 'error') {
            this.error(message, undefined, {
                ...context,
                event,
                severity,
                type: 'security',
            });
        }
        else {
            this.warn(message, {
                ...context,
                event,
                severity,
                type: 'security',
            });
        }
    }
    logPerformance(operation, duration, context) {
        const level = duration > 5000 ? 'warn' : 'log';
        const message = `Performance: ${operation} took ${duration}ms`;
        if (level === 'warn') {
            this.warn(message, {
                ...context,
                operation,
                duration,
                type: 'performance',
            });
        }
        else {
            this.log(message, {
                ...context,
                operation,
                duration,
                type: 'performance',
            });
        }
    }
    getLogFiles() {
        try {
            const fs = require('fs');
            const files = fs.readdirSync(this.logDir);
            return files.filter((file) => file.startsWith(this.serviceName));
        }
        catch (error) {
            return [];
        }
    }
    clearOldLogs() {
        try {
            const fs = require('fs');
            const path = require('path');
            const files = fs.readdirSync(this.logDir);
            const now = Date.now();
            const maxAge = 7 * 24 * 60 * 60 * 1000;
            files.forEach((file) => {
                if (file.startsWith(this.serviceName)) {
                    const filePath = path.join(this.logDir, file);
                    const stats = fs.statSync(filePath);
                    if (now - stats.mtime.getTime() > maxAge) {
                        fs.unlinkSync(filePath);
                    }
                }
            });
        }
        catch (error) {
            console.error('Failed to clear old logs:', error);
        }
    }
};
exports.AppLoggerService = AppLoggerService;
exports.AppLoggerService = AppLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppLoggerService);
//# sourceMappingURL=logger.service.js.map