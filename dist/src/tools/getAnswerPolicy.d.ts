import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
export declare function getAnswerPolicy(client: AuthorityPromptClient, input: Record<string, unknown>): Promise<{
    domain: string;
}>;
