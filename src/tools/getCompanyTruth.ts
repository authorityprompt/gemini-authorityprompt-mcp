import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { validateDomain } from "../utils/validation.js";

const DEFAULT_INCLUDE = ["profile", "facts", "sources", "conflicts", "confidence", "provenance", "answer_blocks", "llm_instructions"];

export async function getCompanyTruth(client: AuthorityPromptClient, input: Record<string, unknown>) {
  const domain = validateDomain(input.domain);
  const include = Array.isArray(input.include) && input.include.length ? input.include.map(String) : DEFAULT_INCLUDE;
  const truthPackage: Record<string, unknown> = {};
  if (include.includes("profile")) truthPackage.profile = await client.getManifest(domain);
  if (include.includes("facts")) truthPackage.facts = await client.getFacts(domain);
  if (include.includes("sources")) truthPackage.sources = await client.getSources(domain);
  if (include.includes("conflicts")) truthPackage.conflicts = await client.getConflicts(domain);
  if (include.includes("confidence")) truthPackage.confidence = await client.getConfidence(domain);
  if (include.includes("provenance")) truthPackage.provenance = await client.getProvenance(domain);
  if (include.includes("answer_blocks")) truthPackage.answer_blocks = await client.getAnswerBlocks(domain);
  if (include.includes("llm_instructions")) truthPackage.llm_instructions = await client.getInstructions(domain);
  return { domain, status: "ok", truth_package: truthPackage };
}
