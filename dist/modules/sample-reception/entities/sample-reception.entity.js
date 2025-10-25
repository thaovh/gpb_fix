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
exports.SampleReception = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const sample_type_entity_1 = require("../../sample-type/entities/sample-type.entity");
let SampleReception = class SampleReception extends base_entity_1.BaseEntity {
    getFormattedCode() {
        return this.receptionCode;
    }
    getDateString() {
        return this.receptionDate.toISOString().slice(0, 10);
    }
};
exports.SampleReception = SampleReception;
__decorate([
    (0, typeorm_1.Column)({ name: 'RECEPTION_CODE', unique: true }),
    __metadata("design:type", String)
], SampleReception.prototype, "receptionCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SAMPLE_TYPE_ID', type: 'varchar2', length: 36 }),
    __metadata("design:type", String)
], SampleReception.prototype, "sampleTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'RECEPTION_DATE', type: 'date' }),
    __metadata("design:type", Date)
], SampleReception.prototype, "receptionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SEQUENCE_NUMBER', type: 'number' }),
    __metadata("design:type", Number)
], SampleReception.prototype, "sequenceNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sample_type_entity_1.SampleType),
    (0, typeorm_1.JoinColumn)({ name: 'SAMPLE_TYPE_ID' }),
    __metadata("design:type", sample_type_entity_1.SampleType)
], SampleReception.prototype, "sampleType", void 0);
exports.SampleReception = SampleReception = __decorate([
    (0, typeorm_1.Entity)('BML_SAMPLE_RECEPTIONS')
], SampleReception);
//# sourceMappingURL=sample-reception.entity.js.map