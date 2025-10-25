export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
export declare class CurrentUserContextService {
    private currentUser;
    setCurrentUser(user: CurrentUser): void;
    getCurrentUser(): CurrentUser | null;
    getCurrentUserId(): string | null;
    clearCurrentUser(): void;
}
