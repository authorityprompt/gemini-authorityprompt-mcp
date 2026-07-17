import { fetch } from "undici";
import { TTLCache } from "../utils/cache.js";
import { AuthorityPromptApiError } from "../utils/errors.js";
import { validateDomain } from "../utils/validation.js";
export class AuthorityPromptClient {
    config;
    cache;
    constructor(config) {
        this.config = config;
        this.cache = new TTLCache(config.cacheTtlSeconds);
    }
    headers(contentType = false) {
        const headers = {
            "User-Agent": "AuthorityPrompt-Gemini-MCP/0.1.0",
            "X-AP-Client": "mcp-gemini",
            "X-AP-MCP-Version": "0.1.0",
        };
        if (contentType)
            headers["Content-Type"] = "application/json";
        if (this.config.apiKey)
            headers.Authorization = `Bearer ${this.config.apiKey}`;
        return headers;
    }
    companyUrl(domain, path) {
        const clean = validateDomain(domain);
        return `${this.config.apiUrl}/company/${clean}/${path.replace(/^\//, "")}`;
    }
    async getJson(domain, path, cacheKey) {
        const clean = validateDomain(domain);
        const key = `${clean}:${cacheKey}`;
        const cached = this.cache.get(key);
        if (cached !== undefined)
            return cached;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
        try {
            const response = await fetch(this.companyUrl(clean, path), { headers: this.headers(), signal: controller.signal });
            if (!response.ok)
                throw new AuthorityPromptApiError(`AuthorityPrompt endpoint failed: ${response.status}`, response.status);
            const json = (await response.json());
            this.cache.set(key, json);
            return json;
        }
        finally {
            clearTimeout(timeout);
        }
    }
    async getText(domain, path, cacheKey) {
        const clean = validateDomain(domain);
        const key = `${clean}:${cacheKey}`;
        const cached = this.cache.get(key);
        if (cached !== undefined)
            return cached;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
        try {
            const response = await fetch(this.companyUrl(clean, path), { headers: this.headers(), signal: controller.signal });
            if (!response.ok)
                throw new AuthorityPromptApiError(`AuthorityPrompt endpoint failed: ${response.status}`, response.status);
            const text = await response.text();
            this.cache.set(key, text);
            return text;
        }
        finally {
            clearTimeout(timeout);
        }
    }
    getManifest(domain) { return this.getJson(domain, "manifest.json", "manifest"); }
    getFacts(domain) { return this.getJson(domain, "facts.json", "facts"); }
    getSources(domain) { return this.getJson(domain, "sources.json", "sources"); }
    getConflicts(domain) { return this.getJson(domain, "conflicts.json", "conflicts"); }
    getConfidence(domain) { return this.getJson(domain, "confidence.json", "confidence"); }
    getProvenance(domain) { return this.getJson(domain, "provenance.json", "provenance"); }
    getAnswerBlocks(domain) { return this.getJson(domain, "answer-blocks.json", "answer_blocks"); }
    getInstructions(domain) { return this.getText(domain, "llm-instructions.txt", "llm_instructions"); }
    getResponseContract(domain) { return this.getJson(domain, "response-contract.json", "response_contract"); }
    getResponseSchema(domain) { return this.getJson(domain, "response-schema.json", "response_schema"); }
    getAnswerPolicy(domain) { return this.getJson(domain, "answer-policy.json", "answer_policy"); }
    getResponsePriorities(domain) { return this.getJson(domain, "response-priorities.json", "response_priorities"); }
    getResponseVariants(domain) { return this.getJson(domain, "response-variants.json", "response_variants"); }
    getResponseQuality(domain) { return this.getJson(domain, "response-quality.json", "response_quality"); }
    async callHostedTool(tool, arguments_) {
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
            let payload;
            try {
                payload = JSON.parse(raw);
            }
            catch {
                throw new AuthorityPromptApiError(`MCP call returned non-JSON response: ${response.status}`, response.status);
            }
            if (!response.ok || payload.status === "error") {
                throw new AuthorityPromptApiError(String(payload.error || `MCP call failed: ${response.status}`), response.status);
            }
            return payload.result;
        }
        finally {
            clearTimeout(timeout);
        }
    }
}
//# sourceMappingURL=authoritypromptClient.js.map