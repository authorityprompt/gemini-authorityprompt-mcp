import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";
import { validateDomain } from "../src/utils/validation.js";

const baseArgv = ["node", "authorityprompt-mcp"];

describe("config", () => {
  it("uses CLI args before env", () => {
    const config = loadConfig([...baseArgv, "--api-url", "https://example.com", "--domain", "stripe.com", "--timeout", "1234"], {
      AUTHORITYPROMPT_API_URL: "https://authorityprompt.com",
      AUTHORITYPROMPT_DEFAULT_DOMAIN: "authorityprompt.com",
    });
    expect(config.apiUrl).toBe("https://example.com");
    expect(config.defaultDomain).toBe("stripe.com");
    expect(config.timeoutMs).toBe(1234);
  });

  it("rejects non-bare domains", () => {
    expect(() => validateDomain("https://authorityprompt.com")).toThrow();
    expect(() => validateDomain("authorityprompt.com/path")).toThrow();
    expect(() => validateDomain("<script>")).toThrow();
    expect(validateDomain("AuthorityPrompt.COM")).toBe("authorityprompt.com");
  });
});
