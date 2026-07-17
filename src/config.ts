import "dotenv/config";
import { validateDomain } from "./utils/validation.js";

export type LogLevel = "debug" | "info" | "warn" | "error";
export interface AuthorityPromptConfig {
  apiUrl: string;
  defaultDomain: string;
  apiKey?: string;
  timeoutMs: number;
  cacheTtlSeconds: number;
  logLevel: LogLevel;
}

const DEFAULTS = { apiUrl: "https://authorityprompt.com", defaultDomain: "authorityprompt.com", timeoutMs: 10000, cacheTtlSeconds: 300, logLevel: "info" as LogLevel };

function readArg(name: string, argv = process.argv): string | undefined {
  const flag = `--${name}`;
  const index = argv.indexOf(flag);
  if (index >= 0 && argv[index + 1] && !argv[index + 1].startsWith("--")) return argv[index + 1];
  const inline = argv.find((item) => item.startsWith(`${flag}=`));
  return inline ? inline.slice(flag.length + 1) : undefined;
}

function numberValue(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeApiUrl(value: string): string {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("AUTHORITYPROMPT_API_URL must use http or https");
  return url.toString().replace(/\/$/, "");
}

export function loadConfig(argv = process.argv, env = process.env): AuthorityPromptConfig {
  const apiUrl = normalizeApiUrl(readArg("api-url", argv) || env.AUTHORITYPROMPT_API_URL || DEFAULTS.apiUrl);
  const defaultDomain = validateDomain(readArg("domain", argv) || env.AUTHORITYPROMPT_DEFAULT_DOMAIN || DEFAULTS.defaultDomain);
  const logLevel = (readArg("log-level", argv) || env.AUTHORITYPROMPT_LOG_LEVEL || DEFAULTS.logLevel) as LogLevel;
  return {
    apiUrl,
    defaultDomain,
    apiKey: readArg("api-key", argv) || env.AUTHORITYPROMPT_API_KEY || undefined,
    timeoutMs: numberValue(readArg("timeout", argv) || env.AUTHORITYPROMPT_TIMEOUT_MS, DEFAULTS.timeoutMs),
    cacheTtlSeconds: numberValue(readArg("cache-ttl", argv) || env.AUTHORITYPROMPT_CACHE_TTL_SECONDS, DEFAULTS.cacheTtlSeconds),
    logLevel: ["debug", "info", "warn", "error"].includes(logLevel) ? logLevel : DEFAULTS.logLevel,
  };
}
