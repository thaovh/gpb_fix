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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLoaderService = void 0;
const common_1 = require("@nestjs/common");
const dataloader_1 = __importDefault(require("dataloader"));
let DataLoaderService = class DataLoaderService {
    constructor(userRepository, provinceRepository, wardRepository, branchRepository, departmentRepository, roomGroupRepository) {
        this.userRepository = userRepository;
        this.provinceRepository = provinceRepository;
        this.wardRepository = wardRepository;
        this.branchRepository = branchRepository;
        this.departmentRepository = departmentRepository;
        this.roomGroupRepository = roomGroupRepository;
    }
    createUserLoader() {
        return new dataloader_1.default(async (userIds) => {
            const users = await this.userRepository.findByIds([...userIds]);
            const userMap = new Map(users.map(user => [user.id, user]));
            return userIds.map(id => userMap.get(id) || null);
        });
    }
    createProvinceLoader() {
        return new dataloader_1.default(async (provinceIds) => {
            const provinces = await this.provinceRepository.findByIds([...provinceIds]);
            const provinceMap = new Map(provinces.map(province => [province.id, province]));
            return provinceIds.map(id => provinceMap.get(id) || null);
        });
    }
    createWardLoader() {
        return new dataloader_1.default(async (wardIds) => {
            const wards = await this.wardRepository.findByIds([...wardIds]);
            const wardMap = new Map(wards.map(ward => [ward.id, ward]));
            return wardIds.map(id => wardMap.get(id) || null);
        });
    }
    createBranchLoader() {
        return new dataloader_1.default(async (branchIds) => {
            const branches = await this.branchRepository.findByIds([...branchIds]);
            const branchMap = new Map(branches.map(branch => [branch.id, branch]));
            return branchIds.map(id => branchMap.get(id) || null);
        });
    }
    createWardsByProvinceLoader() {
        return new dataloader_1.default(async (provinceIds) => {
            const wards = await this.wardRepository.findByProvinceIds([...provinceIds]);
            const wardsByProvince = new Map();
            wards.forEach(ward => {
                if (!wardsByProvince.has(ward.provinceId)) {
                    wardsByProvince.set(ward.provinceId, []);
                }
                wardsByProvince.get(ward.provinceId).push(ward);
            });
            return provinceIds.map(provinceId => wardsByProvince.get(provinceId) || []);
        });
    }
    createBranchesByProvinceLoader() {
        return new dataloader_1.default(async (provinceIds) => {
            const branches = await this.branchRepository.findByProvinceIds([...provinceIds]);
            const branchesByProvince = new Map();
            branches.forEach(branch => {
                if (!branchesByProvince.has(branch.provinceId)) {
                    branchesByProvince.set(branch.provinceId, []);
                }
                branchesByProvince.get(branch.provinceId).push(branch);
            });
            return provinceIds.map(provinceId => branchesByProvince.get(provinceId) || []);
        });
    }
    createBranchesByWardLoader() {
        return new dataloader_1.default(async (wardIds) => {
            const branches = await this.branchRepository.findByWardIds([...wardIds]);
            const branchesByWard = new Map();
            branches.forEach(branch => {
                if (!branchesByWard.has(branch.wardId)) {
                    branchesByWard.set(branch.wardId, []);
                }
                branchesByWard.get(branch.wardId).push(branch);
            });
            return wardIds.map(wardId => branchesByWard.get(wardId) || []);
        });
    }
    createDepartmentLoader() {
        return new dataloader_1.default(async (departmentIds) => {
            const departments = await this.departmentRepository.findByIds([...departmentIds]);
            const departmentMap = new Map(departments.map(department => [department.id, department]));
            return departmentIds.map(id => departmentMap.get(id) || null);
        });
    }
    createRoomGroupLoader() {
        return new dataloader_1.default(async (roomGroupIds) => {
            const roomGroups = await this.roomGroupRepository.findByIds([...roomGroupIds]);
            const roomGroupMap = new Map(roomGroups.map(roomGroup => [roomGroup.id, roomGroup]));
            return roomGroupIds.map(id => roomGroupMap.get(id) || null);
        });
    }
    createDepartmentsByBranchLoader() {
        return new dataloader_1.default(async (branchIds) => {
            const departments = await this.departmentRepository.findByBranchIds([...branchIds]);
            const departmentsByBranch = new Map();
            departments.forEach(department => {
                if (!departmentsByBranch.has(department.branchId)) {
                    departmentsByBranch.set(department.branchId, []);
                }
                departmentsByBranch.get(department.branchId).push(department);
            });
            return branchIds.map(branchId => departmentsByBranch.get(branchId) || []);
        });
    }
    createDepartmentsByTypeLoader() {
        return new dataloader_1.default(async (departmentTypeIds) => {
            const departments = await this.departmentRepository.findByDepartmentTypeIds([...departmentTypeIds]);
            const departmentsByType = new Map();
            departments.forEach(department => {
                if (!departmentsByType.has(department.departmentTypeId)) {
                    departmentsByType.set(department.departmentTypeId, []);
                }
                departmentsByType.get(department.departmentTypeId).push(department);
            });
            return departmentTypeIds.map(departmentTypeId => departmentsByType.get(departmentTypeId) || []);
        });
    }
    createDepartmentsByParentLoader() {
        return new dataloader_1.default(async (parentDepartmentIds) => {
            const departments = await Promise.all(parentDepartmentIds.map(parentId => this.departmentRepository.findChildrenByParentId(parentId)));
            const departmentsByParent = new Map();
            parentDepartmentIds.forEach((parentId, index) => {
                departmentsByParent.set(parentId, departments[index]);
            });
            return parentDepartmentIds.map(parentId => departmentsByParent.get(parentId) || []);
        });
    }
    createLoaders() {
        return {
            userLoader: this.createUserLoader(),
            provinceLoader: this.createProvinceLoader(),
            wardLoader: this.createWardLoader(),
            branchLoader: this.createBranchLoader(),
            departmentLoader: this.createDepartmentLoader(),
            roomGroupLoader: this.createRoomGroupLoader(),
            wardsByProvinceLoader: this.createWardsByProvinceLoader(),
            branchesByProvinceLoader: this.createBranchesByProvinceLoader(),
            branchesByWardLoader: this.createBranchesByWardLoader(),
            departmentsByBranchLoader: this.createDepartmentsByBranchLoader(),
            departmentsByTypeLoader: this.createDepartmentsByTypeLoader(),
            departmentsByParentLoader: this.createDepartmentsByParentLoader(),
        };
    }
    clearLoaders(loaders) {
        Object.values(loaders).forEach(loader => loader.clearAll());
    }
};
exports.DataLoaderService = DataLoaderService;
exports.DataLoaderService = DataLoaderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __param(1, (0, common_1.Inject)('IProvinceRepository')),
    __param(2, (0, common_1.Inject)('IWardRepository')),
    __param(3, (0, common_1.Inject)('IBranchRepository')),
    __param(4, (0, common_1.Inject)('IDepartmentRepository')),
    __param(5, (0, common_1.Inject)('IRoomGroupRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], DataLoaderService);
//# sourceMappingURL=dataloader.service.js.map