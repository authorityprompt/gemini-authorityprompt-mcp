import { describe, expect, it } from "vitest";
import { AuthorityPromptClient } from "../src/api/authoritypromptClient.js";
import type { AuthorityPromptConfig } from "../src/config.js";

const config: AuthorityPromptConfig = {
  apiUrl: "https://authorityprompt.com",
  defaultDomain: "authorityprompt.com",
  timeoutMs: 1000,
  cacheTtlSeconds: 300,
  logLevel: "info",
};

describe("AuthorityPromptClient", () => {
  it("builds canonical company URLs", () => {
    const client = new AuthorityPromptClient(config);
    expect(client.companyUrl("authorityprompt.com", "facts.json")).toBe("https://authorityprompt.com/company/authorityprompt.com/facts.json");
  });
});
