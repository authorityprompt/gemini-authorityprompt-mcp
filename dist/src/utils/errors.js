export class AuthorityPromptApiError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "AuthorityPromptApiError";
    }
}
export function safeError(error) {
    if (error instanceof Error)
        return { error: error.message };
    return { error: "unknown_error" };
}
//# sourceMappingURL=errors.js.map