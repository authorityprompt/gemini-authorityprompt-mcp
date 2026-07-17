import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { firstArray } from "../utils/normalize.js";
import { optionalFactType, validateDomain } from "../utils/validation.js";

export async function getVerifiedFacts(client: AuthorityPromptClient, input: Record<string, unknown>) {
  const domain = validateDomain(input.domain);
  const factType = optionalFactType(input.fact_type);
  const payload = await client.getFacts(domain);
  const facts = firstArray(payload, ["facts", "items"]).filter((fact) => {
    if (!factType || !fact || typeof fact !== "object") return true;
    const record = fact as Record<string, unknown>;
    return String(record.fact_type || record.type || "").toLowerCase() === factType;
  });
  return { domain, facts };
}
