import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
export declare function getResponseQuality(client: AuthorityPromptClient, input: Record<string, unknown>): Promise<{
    domain: string;
}>;
