import "dotenv/config";
export type LogLevel = "debug" | "info" | "warn" | "error";
export interface AuthorityPromptConfig {
    apiUrl: string;
    defaultDomain: string;
    apiKey?: string;
    timeoutMs: number;
    cacheTtlSeconds: number;
    logLevel: LogLevel;
}
export declare function loadConfig(argv?: string[], env?: NodeJS.ProcessEnv): AuthorityPromptConfig;
