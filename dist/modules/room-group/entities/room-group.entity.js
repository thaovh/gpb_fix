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
exports.RoomGroup = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
let RoomGroup = class RoomGroup extends base_entity_1.BaseEntity {
    getDisplayName() {
        return `${this.roomGroupCode} - ${this.roomGroupName}`;
    }
    getFullName() {
        return this.roomGroupName;
    }
    isRoomGroupActive() {
        return this.isActive && !this.deletedAt;
    }
    getShortDisplayName() {
        return this.roomGroupName;
    }
    validateRoomGroupCode() {
        return /^[A-Z0-9_]{2,20}$/.test(this.roomGroupCode);
    }
    validateRoomGroupName() {
        return this.roomGroupName && this.roomGroupName.trim().length >= 2;
    }
    toJSON() {
        return {
            id: this.id,
            roomGroupCode: this.roomGroupCode,
            roomGroupName: this.roomGroupName,
            isActive: this.isActive,
            sortOrder: this.sortOrder,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            version: this.version,
        };
    }
};
exports.RoomGroup = RoomGroup;
__decorate([
    (0, typeorm_1.Column)({ name: 'ROOM_GROUP_CODE', unique: true, length: 20 }),
    __metadata("design:type", String)
], RoomGroup.prototype, "roomGroupCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ROOM_GROUP_NAME', length: 100 }),
    __metadata("design:type", String)
], RoomGroup.prototype, "roomGroupName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_ACTIVE', default: true }),
    __metadata("design:type", Boolean)
], RoomGroup.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SORT_ORDER', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], RoomGroup.prototype, "sortOrder", void 0);
exports.RoomGroup = RoomGroup = __decorate([
    (0, typeorm_1.Entity)('BML_ROOM_GROUPS'),
    (0, typeorm_1.Index)('IDX_BML_RG_CODE', ['roomGroupCode']),
    (0, typeorm_1.Index)('IDX_BML_RG_NAME', ['roomGroupName']),
    (0, typeorm_1.Index)('IDX_BML_RG_ACTIVE', ['isActive']),
    (0, typeorm_1.Index)('IDX_BML_RG_SORT', ['sortOrder'])
], RoomGroup);
//# sourceMappingURL=room-group.entity.js.map