export class AuthorityPromptApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "AuthorityPromptApiError";
  }
}

export function safeError(error: unknown): { error: string } {
  if (error instanceof Error) return { error: error.message };
  return { error: "unknown_error" };
}
