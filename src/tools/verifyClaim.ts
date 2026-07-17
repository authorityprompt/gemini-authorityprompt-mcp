import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { validateClaim, validateDomain } from "../utils/validation.js";
export async function verifyClaim(client: AuthorityPromptClient, input: Record<string, unknown>) {
  const domain = validateDomain(input.domain);
  const claim = validateClaim(input.claim);
  return client.callHostedTool("verify_claim", { domain, claim });
}
