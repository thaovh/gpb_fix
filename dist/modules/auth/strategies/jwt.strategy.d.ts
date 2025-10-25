import { Strategy } from 'passport-jwt';
import { User } from '../../user/entities/user.entity';
import { IUserRepository } from '../../user/interfaces/user.repository.interface';
export interface JwtPayload {
    sub: string;
    username: string;
    email: string;
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
