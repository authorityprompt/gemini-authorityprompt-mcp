import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { validateDomain } from "../utils/validation.js";
export async function getConfidence(client: AuthorityPromptClient, input: Record<string, unknown>) {
  const domain = validateDomain(input.domain);
  return { domain, ...(await client.getConfidence(domain)) };
}
