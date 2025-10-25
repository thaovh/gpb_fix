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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const branch_entity_1 = require("../../branch/entities/branch.entity");
const department_type_entity_1 = require("../../department-type/entities/department-type.entity");
let Department = class Department extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.departmentCode} - ${this.departmentName}`;
    }
    getFullName() {
        return this.departmentName;
    }
    isRootDepartment() {
        return !this.parentDepartmentId;
    }
    hasChildren() {
        return this.children && this.children.length > 0;
    }
    getHierarchyLevel() {
        let level = 0;
        let current = this.parent;
        while (current) {
            level++;
            current = current.parent;
        }
        return level;
    }
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.Column)({ name: 'DEPARTMENT_CODE', unique: true, length: 20 }),
    __metadata("design:type", String)
], Department.prototype, "departmentCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DEPARTMENT_NAME', length: 100 }),
    __metadata("design:type", String)
], Department.prototype, "departmentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'BRANCH_ID', type: 'uuid' }),
    __metadata("design:type", String)
], Department.prototype, "branchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'HEAD_OF_DEPARTMENT', length: 100, nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "headOfDepartment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'HEAD_NURSE', length: 100, nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "headNurse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PARENT_DEPARTMENT_ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SHORT_NAME', length: 50, nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DEPARTMENT_TYPE_ID', type: 'uuid' }),
    __metadata("design:type", String)
], Department.prototype, "departmentTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_ACTIVE', default: true }),
    __metadata("design:type", Boolean)
], Department.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SORT_ORDER', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Department.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => branch_entity_1.Branch, branch => branch.departments),
    (0, typeorm_1.JoinColumn)({ name: 'BRANCH_ID' }),
    __metadata("design:type", branch_entity_1.Branch)
], Department.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_type_entity_1.DepartmentType, departmentType => departmentType.departments),
    (0, typeorm_1.JoinColumn)({ name: 'DEPARTMENT_TYPE_ID' }),
    __metadata("design:type", department_type_entity_1.DepartmentType)
], Department.prototype, "departmentType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Department, department => department.children),
    (0, typeorm_1.JoinColumn)({ name: 'PARENT_DEPARTMENT_ID' }),
    __metadata("design:type", Department)
], Department.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Department, department => department.parent),
    __metadata("design:type", Array)
], Department.prototype, "children", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)('BML_DEPARTMENTS'),
    (0, typeorm_1.Index)('IDX_BML_DEPT_CODE', ['departmentCode']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_NAME', ['departmentName']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_BRANCH', ['branchId']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_TYPE', ['departmentTypeId']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_PARENT', ['parentDepartmentId']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_ACTIVE', ['isActive']),
    (0, typeorm_1.Index)('IDX_BML_DEPT_SORT', ['sortOrder'])
], Department);
//# sourceMappingURL=department.entity.js.map