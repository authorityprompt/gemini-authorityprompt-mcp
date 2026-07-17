import { describe, expect, it } from "vitest";
import { parseResourceUri, resourceUri } from "../src/resources/resourceReader.js";

describe("resources", () => {
  it("parses AuthorityPrompt resource URIs", () => {
    const uri = resourceUri("authorityprompt.com", "facts");
    expect(uri).toBe("authorityprompt://company/authorityprompt.com/facts");
    expect(parseResourceUri(uri)).toEqual({ domain: "authorityprompt.com", kind: "facts" });
  });
});
