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
exports.Branch = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const province_entity_1 = require("../../province/entities/province.entity");
const ward_entity_1 = require("../../ward/entities/ward.entity");
let Branch = class Branch extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.branchCode} - ${this.branchName}`;
    }
    isBranchActive() {
        return this.isActive && !this.deletedAt;
    }
    getFullAddress() {
        if (this.ward && this.province) {
            return `${this.address}, ${this.ward.wardName}, ${this.province.provinceName}`;
        }
        return this.address;
    }
    validateBranchCode() {
        return /^[A-Z]{2,3}[0-9]{3}$/.test(this.branchCode);
    }
    validateBranchName() {
        return this.branchName && this.branchName.trim().length >= 2;
    }
    validateShortName() {
        return this.shortName && this.shortName.trim().length >= 2;
    }
    validatePhoneNumber() {
        return /^(\+84|84|0)[1-9][0-9]{8,9}$/.test(this.phoneNumber);
    }
    validateHospitalLevel() {
        const validLevels = ['Tuyến 1', 'Tuyến 2', 'Tuyến 3', 'Tuyến 4'];
        return validLevels.includes(this.hospitalLevel);
    }
    validateBhyCode() {
        return /^[0-9]{10,15}$/.test(this.bhyCode);
    }
    toJSON() {
        return {
            id: this.id,
            branchCode: this.branchCode,
            branchName: this.branchName,
            shortName: this.shortName,
            provinceId: this.provinceId,
            wardId: this.wardId,
            address: this.address,
            phoneNumber: this.phoneNumber,
            hospitalLevel: this.hospitalLevel,
            representative: this.representative,
            bhyCode: this.bhyCode,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            version: this.version,
        };
    }
};
exports.Branch = Branch;
__decorate([
    (0, typeorm_1.Column)({ name: 'BRANCH_CODE', unique: true }),
    __metadata("design:type", String)
], Branch.prototype, "branchCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'BRANCH_NAME' }),
    __metadata("design:type", String)
], Branch.prototype, "branchName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SHORT_NAME' }),
    __metadata("design:type", String)
], Branch.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PROVINCE_ID', type: 'varchar2', length: 36 }),
    __metadata("design:type", String)
], Branch.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'WARD_ID', type: 'varchar2', length: 36 }),
    __metadata("design:type", String)
], Branch.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ADDRESS', type: 'varchar2', length: 500 }),
    __metadata("design:type", String)
], Branch.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PHONE_NUMBER', type: 'varchar2', length: 20 }),
    __metadata("design:type", String)
], Branch.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'HOSPITAL_LEVEL', type: 'varchar2', length: 50 }),
    __metadata("design:type", String)
], Branch.prototype, "hospitalLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'REPRESENTATIVE', type: 'varchar2', length: 100 }),
    __metadata("design:type", String)
], Branch.prototype, "representative", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'BHYT_CODE', type: 'varchar2', length: 20 }),
    __metadata("design:type", String)
], Branch.prototype, "bhyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_ACTIVE', default: true }),
    __metadata("design:type", Boolean)
], Branch.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province),
    (0, typeorm_1.JoinColumn)({ name: 'PROVINCE_ID' }),
    __metadata("design:type", province_entity_1.Province)
], Branch.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ward_entity_1.Ward),
    (0, typeorm_1.JoinColumn)({ name: 'WARD_ID' }),
    __metadata("design:type", ward_entity_1.Ward)
], Branch.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Department', 'branch'),
    __metadata("design:type", Array)
], Branch.prototype, "departments", void 0);
exports.Branch = Branch = __decorate([
    (0, typeorm_1.Entity)('BML_BRANCHES')
], Branch);
//# sourceMappingURL=branch.entity.js.map