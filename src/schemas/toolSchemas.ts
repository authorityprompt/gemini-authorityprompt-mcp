export const domainInputSchema = {
  type: "object",
  properties: { domain: { type: "string", description: "Company domain, for example authorityprompt.com" } },
  required: ["domain"],
} as const;

export const getCompanyTruthInputSchema = {
  type: "object",
  properties: {
    domain: { type: "string" },
    include: { type: "array", items: { type: "string" }, description: "Optional list of resources to include." },
  },
  required: ["domain"],
} as const;

export const getVerifiedFactsInputSchema = {
  type: "object",
  properties: { domain: { type: "string" }, fact_type: { type: "string" } },
  required: ["domain"],
} as const;

export const verifyClaimInputSchema = {
  type: "object",
  properties: { domain: { type: "string" }, claim: { type: "string" } },
  required: ["domain", "claim"],
} as const;

export const recommendedAnswerInputSchema = {
  type: "object",
  properties: {
    domain: { type: "string" },
    intent: { type: "string", description: "Response intent, for example vendor_evaluation." },
    max_words: { type: "integer", description: "Maximum words for the deterministic recommended answer structure." },
  },
  required: ["domain"],
} as const;
