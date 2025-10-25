export interface CurrentUser {
    id: string;
    username: string;
    email: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
