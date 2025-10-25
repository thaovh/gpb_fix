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
exports.Room = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const department_entity_1 = require("../../department/entities/department.entity");
const room_group_entity_1 = require("../../room-group/entities/room-group.entity");
let Room = class Room extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.roomCode} - ${this.roomName}`;
    }
    getFullName() {
        return this.roomName;
    }
    isAvailable() {
        return this.isActive && !this.deletedAt;
    }
};
exports.Room = Room;
__decorate([
    (0, typeorm_1.Column)({ name: 'ROOM_CODE', unique: true, length: 20 }),
    __metadata("design:type", String)
], Room.prototype, "roomCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ROOM_NAME', length: 100 }),
    __metadata("design:type", String)
], Room.prototype, "roomName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ROOM_ADDRESS', length: 200, nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "roomAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DEPARTMENT_ID', type: 'varchar2', length: 36 }),
    __metadata("design:type", String)
], Room.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ROOM_GROUP_ID', type: 'varchar2', length: 36 }),
    __metadata("design:type", String)
], Room.prototype, "roomGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DESCRIPTION', type: 'clob', nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_ACTIVE', default: true }),
    __metadata("design:type", Boolean)
], Room.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SORT_ORDER', type: 'number', default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'DEPARTMENT_ID' }),
    __metadata("design:type", department_entity_1.Department)
], Room.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_group_entity_1.RoomGroup),
    (0, typeorm_1.JoinColumn)({ name: 'ROOM_GROUP_ID' }),
    __metadata("design:type", room_group_entity_1.RoomGroup)
], Room.prototype, "roomGroup", void 0);
exports.Room = Room = __decorate([
    (0, typeorm_1.Entity)('BML_ROOMS'),
    (0, typeorm_1.Index)('IDX_BML_ROOMS_CODE', ['roomCode']),
    (0, typeorm_1.Index)('IDX_BML_ROOMS_NAME', ['roomName']),
    (0, typeorm_1.Index)('IDX_BML_ROOMS_DEPT', ['departmentId']),
    (0, typeorm_1.Index)('IDX_BML_ROOMS_GROUP', ['roomGroupId']),
    (0, typeorm_1.Index)('IDX_BML_ROOMS_ACTIVE', ['isActive'])
], Room);
//# sourceMappingURL=room.entity.js.map