import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
export declare function getSources(client: AuthorityPromptClient, input: Record<string, unknown>): Promise<{
    domain: string;
}>;
