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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const password_service_1 = require("../../shared/services/password.service");
const base_service_1 = require("../../common/services/base.service");
const current_user_context_service_1 = require("../../common/services/current-user-context.service");
let UserService = class UserService extends base_service_1.BaseService {
    constructor(userRepository, dataSource, passwordService, currentUserContext) {
        super(dataSource, currentUserContext);
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }
    async createUser(createUserDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const existingUser = await this.userRepository.findByEmail(createUserDto.email);
            if (existingUser) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            const user = new user_entity_1.User();
            user.username = createUserDto.username;
            user.email = createUserDto.email;
            user.passwordHash = await this.passwordService.hashPassword(createUserDto.password);
            user.fullName = createUserDto.fullName;
            user.phoneNumber = createUserDto.phoneNumber;
            user.address = createUserDto.address;
            this.setAuditFields(user, false);
            const savedUser = await manager.save(user_entity_1.User, user);
            return savedUser.id;
        });
    }
    async updateUser(id, updateUserDto, currentUser) {
        this.currentUserContext.setCurrentUser(currentUser);
        return this.transactionWithAudit(async (manager) => {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            Object.assign(user, updateUserDto);
            this.setAuditFields(user, true);
            await manager.save(user_entity_1.User, user);
        });
    }
    async deleteUser(id) {
        return this.dataSource.transaction(async (manager) => {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.userRepository.delete(id);
        });
    }
    async activateUser(id) {
        return this.dataSource.transaction(async (manager) => {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.isActive = true;
            await manager.save(user_entity_1.User, user);
        });
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapUserToResponseDto(user);
    }
    async getUsers(query) {
        const { limit = 10, offset = 0, search, status } = query;
        const [users, total] = await this.userRepository.findActiveUsers(limit, offset);
        return {
            users: users.map(user => this.mapUserToResponseDto(user)),
            total,
            limit,
            offset,
        };
    }
    async findUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        return user ? this.mapUserToResponseDto(user) : null;
    }
    mapUserToResponseDto(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            isActive: user.isActive,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource,
        password_service_1.PasswordService,
        current_user_context_service_1.CurrentUserContextService])
], UserService);
//# sourceMappingURL=user.service.js.map