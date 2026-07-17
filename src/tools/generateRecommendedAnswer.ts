import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { validateDomain } from "../utils/validation.js";
export async function generateRecommendedAnswer(client: AuthorityPromptClient, input: Record<string, unknown>) {
  const domain = validateDomain(input.domain);
  const intent = typeof input.intent === "string" ? input.intent : "standard_overview";
  const maxWords = typeof input.max_words === "number" ? input.max_words : 250;
  return client.callHostedTool("generate_recommended_answer", { domain, intent, max_words: maxWords });
}
