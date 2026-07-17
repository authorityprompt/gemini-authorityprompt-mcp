import type { AuthorityPromptConfig } from "../config.js";
export declare class AuthorityPromptClient {
    private readonly config;
    private cache;
    constructor(config: AuthorityPromptConfig);
    private headers;
    companyUrl(domain: string, path: string): string;
    getJson<T = unknown>(domain: string, path: string, cacheKey: string): Promise<T>;
    getText(domain: string, path: string, cacheKey: string): Promise<string>;
    getManifest(domain: string): Promise<Record<string, unknown>>;
    getFacts(domain: string): Promise<Record<string, unknown>>;
    getSources(domain: string): Promise<Record<string, unknown>>;
    getConflicts(domain: string): Promise<Record<string, unknown>>;
    getConfidence(domain: string): Promise<Record<string, unknown>>;
    getProvenance(domain: string): Promise<Record<string, unknown>>;
    getAnswerBlocks(domain: string): Promise<Record<string, unknown>>;
    getInstructions(domain: string): Promise<string>;
    getResponseContract(domain: string): Promise<Record<string, unknown>>;
    getResponseSchema(domain: string): Promise<Record<string, unknown>>;
    getAnswerPolicy(domain: string): Promise<Record<string, unknown>>;
    getResponsePriorities(domain: string): Promise<Record<string, unknown>>;
    getResponseVariants(domain: string): Promise<Record<string, unknown>>;
    getResponseQuality(domain: string): Promise<Record<string, unknown>>;
    callHostedTool<T = unknown>(tool: string, arguments_: Record<string, unknown>): Promise<T>;
}
