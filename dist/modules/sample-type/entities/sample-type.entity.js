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
exports.SampleType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
let SampleType = class SampleType extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.typeCode} - ${this.typeName}`;
    }
    getCodeGenerationInfo() {
        return `${this.codePrefix} (${this.codeWidth} digits, ${this.allowDuplicate ? 'duplicate allowed' : 'unique'}, ${this.resetPeriod})`;
    }
};
exports.SampleType = SampleType;
__decorate([
    (0, typeorm_1.Column)({ name: 'TYPE_CODE', unique: true }),
    __metadata("design:type", String)
], SampleType.prototype, "typeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TYPE_NAME' }),
    __metadata("design:type", String)
], SampleType.prototype, "typeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SHORT_NAME', nullable: true }),
    __metadata("design:type", String)
], SampleType.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DESCRIPTION', type: 'varchar2', length: 2000, nullable: true }),
    __metadata("design:type", String)
], SampleType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SORT_ORDER', type: 'number', default: 0 }),
    __metadata("design:type", Number)
], SampleType.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CODE_PREFIX', length: 5 }),
    __metadata("design:type", String)
], SampleType.prototype, "codePrefix", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CODE_WIDTH', type: 'number', default: 4 }),
    __metadata("design:type", Number)
], SampleType.prototype, "codeWidth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ALLOW_DUPLICATE', type: 'number', default: 0 }),
    __metadata("design:type", Boolean)
], SampleType.prototype, "allowDuplicate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'RESET_PERIOD', type: 'varchar2', length: 20, default: 'MONTHLY' }),
    __metadata("design:type", String)
], SampleType.prototype, "resetPeriod", void 0);
exports.SampleType = SampleType = __decorate([
    (0, typeorm_1.Entity)('BML_SAMPLE_TYPES')
], SampleType);
//# sourceMappingURL=sample-type.entity.js.map