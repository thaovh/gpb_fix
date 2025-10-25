export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
    score: number;
    strength: 'weak' | 'medium' | 'strong' | 'very_strong';
}
export declare class PasswordService {
    private readonly saltRounds;
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
    validatePasswordStrength(password: string): PasswordValidationResult;
    private hasCommonPatterns;
    private hasRepeatedCharacters;
    generateSecurePassword(length?: number): string;
    isPasswordExpired(lastPasswordChange: Date, maxAgeDays?: number): boolean;
}
