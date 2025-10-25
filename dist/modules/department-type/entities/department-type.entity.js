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
exports.DepartmentType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
let DepartmentType = class DepartmentType extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.typeCode} - ${this.typeName}`;
    }
    getShortDisplayName() {
        return this.typeName;
    }
    isActiveDepartmentType() {
        return this.isActive && !this.deletedAt;
    }
};
exports.DepartmentType = DepartmentType;
__decorate([
    (0, typeorm_1.Column)({ name: 'TYPE_CODE', unique: true, length: 20 }),
    __metadata("design:type", String)
], DepartmentType.prototype, "typeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TYPE_NAME', length: 100 }),
    __metadata("design:type", String)
], DepartmentType.prototype, "typeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DESCRIPTION', type: 'clob', nullable: true }),
    __metadata("design:type", String)
], DepartmentType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_ACTIVE', default: true }),
    __metadata("design:type", Boolean)
], DepartmentType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SORT_ORDER', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DepartmentType.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Department', 'departmentType'),
    __metadata("design:type", Array)
], DepartmentType.prototype, "departments", void 0);
exports.DepartmentType = DepartmentType = __decorate([
    (0, typeorm_1.Entity)('BML_DEPARTMENT_TYPES'),
    (0, typeorm_1.Index)('IDX_BML_DEPT_TYPES_CODE', ['typeCode']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_TYPES_NAME', ['typeName']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_TYPES_ACTIVE', ['isActive']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_TYPES_SORT', ['sortOrder'])
], DepartmentType);
//# sourceMappingURL=department-type.entity.js.map