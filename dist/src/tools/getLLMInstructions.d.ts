import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
export declare function getLLMInstructions(client: AuthorityPromptClient, input: Record<string, unknown>): Promise<{
    domain: string;
    instructions: string;
}>;
