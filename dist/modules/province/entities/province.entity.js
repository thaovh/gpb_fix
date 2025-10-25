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
exports.Province = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
let Province = class Province extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.provinceCode} - ${this.provinceName}`;
    }
    isProvinceActive() {
        return this.isActive && !this.deletedAt;
    }
    validateProvinceCode() {
        return /^[0-9]{2}$/.test(this.provinceCode);
    }
    validateProvinceName() {
        return this.provinceName && this.provinceName.trim().length >= 2;
    }
    validateShortName() {
        return this.shortName && this.shortName.trim().length >= 2;
    }
    toJSON() {
        return {
            id: this.id,
            provinceCode: this.provinceCode,
            provinceName: this.provinceName,
            shortName: this.shortName,
            sortOrder: this.sortOrder,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            version: this.version,
        };
    }
};
exports.Province = Province;
__decorate([
    (0, typeorm_1.Column)({ name: 'PROVINCE_CODE', unique: true }),
    __metadata("design:type", String)
], Province.prototype, "provinceCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PROVINCE_NAME' }),
    __metadata("design:type", String)
], Province.prototype, "provinceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SHORT_NAME' }),
    __metadata("design:type", String)
], Province.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SORT_ORDER', type: 'number' }),
    __metadata("design:type", Number)
], Province.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_ACTIVE', default: true }),
    __metadata("design:type", Boolean)
], Province.prototype, "isActive", void 0);
exports.Province = Province = __decorate([
    (0, typeorm_1.Entity)('BML_PROVINCES')
], Province);
//# sourceMappingURL=province.entity.js.map