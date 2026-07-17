import { fetch } from "undici";
import type { AuthorityPromptConfig } from "../config.js";
import { TTLCache } from "../utils/cache.js";
import { AuthorityPromptApiError } from "../utils/errors.js";
import { validateDomain } from "../utils/validation.js";

export class AuthorityPromptClient {
  private cache: TTLCache<unknown>;

  constructor(private readonly config: AuthorityPromptConfig) {
    this.cache = new TTLCache<unknown>(config.cacheTtlSeconds);
  }

  private headers(contentType = false): Record<string, string> {
    const headers: Record<string, string> = {
      "User-Agent": "AuthorityPrompt-Gemini-MCP/0.1.0",
      "X-AP-Client": "mcp-gemini",
      "X-AP-MCP-Version": "0.1.0",
    };
    if (contentType) headers["Content-Type"] = "application/json";
    if (this.config.apiKey) headers.Authorization = `Bearer ${this.config.apiKey}`;
    return headers;
  }

  companyUrl(domain: string, path: string): string {
    const clean = validateDomain(domain);
    return `${this.config.apiUrl}/company/${clean}/${path.replace(/^\//, "")}`;
  }

  async getJson<T = unknown>(domain: string, path: string, cacheKey: string): Promise<T> {
    const clean = validateDomain(domain);
    const key = `${clean}:${cacheKey}`;
    const cached = this.cache.get(key) as T | undefined;
    if (cached !== undefined) return cached;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
    try {
      const response = await fetch(this.companyUrl(clean, path), { headers: this.headers(), signal: controller.signal });
      if (!response.ok) throw new AuthorityPromptApiError(`AuthorityPrompt endpoint failed: ${response.status}`, response.status);
      const json = (await response.json()) as T;
      this.cache.set(key, json);
      return json;
    } finally {
      clearTimeout(timeout);
    }
  }

  async getText(domain: string, path: string, cacheKey: string): Promise<string> {
    const clean = validateDomain(domain);
    const key = `${clean}:${cacheKey}`;
    const cached = this.cache.get(key) as string | undefined;
    if (cached !== undefined) return cached;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
    try {
      const response = await fetch(this.companyUrl(clean, path), { headers: this.headers(), signal: controller.signal });
      if (!response.ok) throw new AuthorityPromptApiError(`AuthorityPrompt endpoint failed: ${response.status}`, response.status);
      const text = await response.text();
      this.cache.set(key, text);
      return text;
    } finally {
      clearTimeout(timeout);
    }
  }

  getManifest(domain: string) { return this.getJson<Record<string, unknown>>(domain, "manifest.json", "manifest"); }
  getFacts(domain: string) { return this.getJson<Record<string, unknown>>(domain, "facts.json", "facts"); }
  getSources(domain: string) { return this.getJson<Record<string, unknown>>(domain, "sources.json", "sources"); }
  getConflicts(domain: string) { return this.getJson<Record<string, unknown>>(domain, "conflicts.json", "conflicts"); }
  getConfidence(domain: string) { return this.getJson<Record<string, unknown>>(domain, "confidence.json", "confidence"); }
  getProvenance(domain: string) { return this.getJson<Record<string, unknown>>(domain, "provenance.json", "provenance"); }
  getAnswerBlocks(domain: string) { return this.getJson<Record<string, unknown>>(domain, "answer-blocks.json", "answer_blocks"); }
  getInstructions(domain: string) { return this.getText(domain, "llm-instructions.txt", "llm_instructions"); }
  getResponseContract(domain: string) { return this.getJson<Record<string, unknown>>(domain, "response-contract.json", "response_contract"); }
  getResponseSchema(domain: string) { return this.getJson<Record<string, unknown>>(domain, "response-schema.json", "response_schema"); }
  getAnswerPolicy(domain: string) { return this.getJson<Record<string, unknown>>(domain, "answer-policy.json", "answer_policy"); }
  getResponsePriorities(domain: string) { return this.getJson<Record<string, unknown>>(domain, "response-priorities.json", "response_priorities"); }
  getResponseVariants(domain: string) { return this.getJson<Record<string, unknown>>(domain, "response-variants.json", "response_variants"); }
  getResponseQuality(domain: string) { return this.getJson<Record<string, unknown>>(domain, "response-quality.json", "response_quality"); }

  async callHostedTool<T = unknown>(tool: string, arguments_: Record<string, unknown>): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
    try {
      const response = await fetch(`${this.config.apiUrl}/mcp/call`, {
        method: "POST",
        headers: this.headers(true),
        body: JSON.stringify({ tool, arguments: arguments_ }),
        signal: controller.signal,
      });
      const raw = await response.text();
      let payload: Record<string, unknown>;
      try {
        payload = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        throw new AuthorityPromptApiError(`MCP call returned non-JSON response: ${response.status}`, response.status);
      }
      if (!response.ok || payload.status === "error") {
        throw new AuthorityPromptApiError(String(payload.error || `MCP call failed: ${response.status}`), response.status);
      }
      return payload.result as T;
    } finally {
      clearTimeout(timeout);
    }
  }
}
