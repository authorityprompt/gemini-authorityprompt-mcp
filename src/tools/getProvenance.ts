import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { validateDomain } from "../utils/validation.js";
export async function getProvenance(client: AuthorityPromptClient, input: Record<string, unknown>) {
  const domain = validateDomain(input.domain);
  return { domain, ...(await client.getProvenance(domain)) };
}
