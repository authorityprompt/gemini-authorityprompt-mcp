export declare class AuthorityPromptApiError extends Error {
    readonly status?: number | undefined;
    constructor(message: string, status?: number | undefined);
}
export declare function safeError(error: unknown): {
    error: string;
};
