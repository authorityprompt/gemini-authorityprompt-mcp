import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
export declare function checkConflicts(client: AuthorityPromptClient, input: Record<string, unknown>): Promise<{
    domain: string;
}>;
