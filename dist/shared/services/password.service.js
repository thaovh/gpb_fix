"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
let PasswordService = class PasswordService {
    constructor() {
        this.saltRounds = 12;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    validatePasswordStrength(password) {
        const errors = [];
        let score = 0;
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        else if (password.length >= 12) {
            score += 20;
        }
        else {
            score += 10;
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        else {
            score += 15;
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        else {
            score += 15;
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        else {
            score += 15;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        else {
            score += 15;
        }
        if (password.length >= 16) {
            score += 10;
        }
        if (this.hasCommonPatterns(password)) {
            score -= 10;
            errors.push('Password contains common patterns that are easy to guess');
        }
        if (this.hasRepeatedCharacters(password)) {
            score -= 5;
            errors.push('Password contains too many repeated characters');
        }
        let strength;
        if (score < 40) {
            strength = 'weak';
        }
        else if (score < 60) {
            strength = 'medium';
        }
        else if (score < 80) {
            strength = 'strong';
        }
        else {
            strength = 'very_strong';
        }
        return {
            isValid: errors.length === 0,
            errors,
            score: Math.max(0, Math.min(100, score)),
            strength,
        };
    }
    hasCommonPatterns(password) {
        const commonPatterns = [
            '123456',
            'password',
            'qwerty',
            'abc123',
            'admin',
            'user',
            'test',
            'demo',
            'guest',
            'welcome',
            'login',
            'secret',
            'password123',
            'admin123',
            'user123',
        ];
        const lowerPassword = password.toLowerCase();
        return commonPatterns.some(pattern => lowerPassword.includes(pattern));
    }
    hasRepeatedCharacters(password) {
        const repeatedCharRegex = /(.)\1{2,}/;
        return repeatedCharRegex.test(password);
    }
    generateSecurePassword(length = 16) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*()';
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += special[Math.floor(Math.random() * special.length)];
        for (let i = 4; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }
    isPasswordExpired(lastPasswordChange, maxAgeDays = 90) {
        const now = new Date();
        const diffTime = now.getTime() - lastPasswordChange.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > maxAgeDays;
    }
};
exports.PasswordService = PasswordService;
exports.PasswordService = PasswordService = __decorate([
    (0, common_1.Injectable)()
], PasswordService);
//# sourceMappingURL=password.service.js.map