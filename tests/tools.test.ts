import { describe, expect, it } from "vitest";
import { TOOL_DEFINITIONS } from "../src/server.js";

describe("tools", () => {
  it("registers all required AuthorityPrompt tools", () => {
    const names = TOOL_DEFINITIONS.map((tool) => tool.name);
    expect(names).toEqual(expect.arrayContaining([
      "get_company_truth",
      "get_verified_facts",
      "get_sources",
      "check_conflicts",
      "verify_claim",
      "get_confidence",
      "get_provenance",
      "get_answer_blocks",
      "get_llm_instructions",
    ]));
  });
});
