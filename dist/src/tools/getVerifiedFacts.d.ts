import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
export declare function getVerifiedFacts(client: AuthorityPromptClient, input: Record<string, unknown>): Promise<{
    domain: string;
    facts: unknown[];
}>;
