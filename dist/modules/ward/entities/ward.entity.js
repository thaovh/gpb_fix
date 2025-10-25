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
exports.Ward = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const province_entity_1 = require("../../province/entities/province.entity");
let Ward = class Ward extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.wardCode} - ${this.wardName}`;
    }
    isWardActive() {
        return this.isActive && !this.deletedAt;
    }
    validateWardCode() {
        return /^[0-9]{5}$/.test(this.wardCode);
    }
    validateWardName() {
        return this.wardName && this.wardName.trim().length >= 2;
    }
    validateShortName() {
        return this.shortName && this.shortName.trim().length >= 2;
    }
    toJSON() {
        return {
            id: this.id,
            wardCode: this.wardCode,
            wardName: this.wardName,
            provinceId: this.provinceId,
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
exports.Ward = Ward;
__decorate([
    (0, typeorm_1.Column)({ name: 'WARD_CODE', unique: true }),
    __metadata("design:type", String)
], Ward.prototype, "wardCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'WARD_NAME' }),
    __metadata("design:type", String)
], Ward.prototype, "wardName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PROVINCE_ID', type: 'varchar2', length: 36 }),
    __metadata("design:type", String)
], Ward.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SHORT_NAME' }),
    __metadata("design:type", String)
], Ward.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SORT_ORDER', type: 'number' }),
    __metadata("design:type", Number)
], Ward.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_ACTIVE', default: true }),
    __metadata("design:type", Boolean)
], Ward.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province),
    (0, typeorm_1.JoinColumn)({ name: 'PROVINCE_ID' }),
    __metadata("design:type", province_entity_1.Province)
], Ward.prototype, "province", void 0);
exports.Ward = Ward = __decorate([
    (0, typeorm_1.Entity)('BML_WARDS')
], Ward);
//# sourceMappingURL=ward.entity.js.map