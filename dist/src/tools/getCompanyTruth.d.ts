import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
export declare function getCompanyTruth(client: AuthorityPromptClient, input: Record<string, unknown>): Promise<{
    domain: string;
    status: string;
    truth_package: Record<string, unknown>;
}>;
