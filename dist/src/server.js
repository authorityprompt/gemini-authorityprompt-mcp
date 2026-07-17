import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { AuthorityPromptClient } from "./api/authoritypromptClient.js";
import { readAuthorityPromptResource, RESOURCE_KINDS, resourceUri } from "./resources/resourceReader.js";
import { domainInputSchema, getCompanyTruthInputSchema, getVerifiedFactsInputSchema, recommendedAnswerInputSchema, verifyClaimInputSchema } from "./schemas/toolSchemas.js";
import { getAnswerBlocks } from "./tools/getAnswerBlocks.js";
import { getCompanyTruth } from "./tools/getCompanyTruth.js";
import { getConfidence } from "./tools/getConfidence.js";
import { getLLMInstructions } from "./tools/getLLMInstructions.js";
import { getProvenance } from "./tools/getProvenance.js";
import { getSources } from "./tools/getSources.js";
import { getVerifiedFacts } from "./tools/getVerifiedFacts.js";
import { checkConflicts } from "./tools/checkConflicts.js";
import { verifyClaim } from "./tools/verifyClaim.js";
import { getAnswerPolicy } from "./tools/getAnswerPolicy.js";
import { getResponseContract } from "./tools/getResponseContract.js";
import { getResponseQuality } from "./tools/getResponseQuality.js";
import { getResponseSchema } from "./tools/getResponseSchema.js";
import { getResponseVariants } from "./tools/getResponseVariants.js";
import { generateRecommendedAnswer } from "./tools/generateRecommendedAnswer.js";
import { compactJson } from "./utils/normalize.js";
export const TOOL_DEFINITIONS = [
    { name: "get_company_truth", description: "Returns the complete verified company truth package.", inputSchema: getCompanyTruthInputSchema },
    { name: "get_verified_facts", description: "Returns verified facts about the company.", inputSchema: getVerifiedFactsInputSchema },
    { name: "get_sources", description: "Returns the source hierarchy for a company profile.", inputSchema: domainInputSchema },
    { name: "check_conflicts", description: "Returns known conflicts for this company profile.", inputSchema: domainInputSchema },
    { name: "verify_claim", description: "Checks whether a claim is supported by AuthorityPrompt data.", inputSchema: verifyClaimInputSchema },
    { name: "get_confidence", description: "Returns confidence signals for the company profile.", inputSchema: domainInputSchema },
    { name: "get_provenance", description: "Returns the provenance graph for verified company truth.", inputSchema: domainInputSchema },
    { name: "get_answer_blocks", description: "Returns response-ready AI answer blocks.", inputSchema: domainInputSchema },
    { name: "get_llm_instructions", description: "Returns instructions for how AI systems should answer.", inputSchema: domainInputSchema },
    { name: "get_response_contract", description: "Returns the response contract for stable company answers.", inputSchema: domainInputSchema },
    { name: "get_response_schema", description: "Returns the short, standard and long answer schemas.", inputSchema: domainInputSchema },
    { name: "get_answer_policy", description: "Returns answer behavior policy for verified, conflict-aware answers.", inputSchema: domainInputSchema },
    { name: "get_response_variants", description: "Returns intent-specific response variants.", inputSchema: domainInputSchema },
    { name: "get_response_quality", description: "Returns response readiness score and recommendations.", inputSchema: domainInputSchema },
    { name: "generate_recommended_answer", description: "Returns deterministic recommended answer structure for a selected intent.", inputSchema: recommendedAnswerInputSchema },
];
const TOOL_HANDLERS = {
    get_company_truth: getCompanyTruth,
    get_verified_facts: getVerifiedFacts,
    get_sources: getSources,
    check_conflicts: checkConflicts,
    verify_claim: verifyClaim,
    get_confidence: getConfidence,
    get_provenance: getProvenance,
    get_answer_blocks: getAnswerBlocks,
    get_llm_instructions: getLLMInstructions,
    get_response_contract: getResponseContract,
    get_response_schema: getResponseSchema,
    get_answer_policy: getAnswerPolicy,
    get_response_variants: getResponseVariants,
    get_response_quality: getResponseQuality,
    generate_recommended_answer: generateRecommendedAnswer,
};
export function createAuthorityPromptServer(config) {
    const client = new AuthorityPromptClient(config);
    const server = new Server({ name: "authorityprompt-gemini-mcp", version: "0.1.0" }, { capabilities: { tools: {}, resources: {} } });
    server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFINITIONS }));
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const name = request.params.name;
        const input = (request.params.arguments || {});
        const handler = TOOL_HANDLERS[name];
        if (!handler) {
            return { isError: true, content: [{ type: "text", text: `unknown tool: ${name}` }] };
        }
        try {
            const result = await handler(client, input);
            return { content: [{ type: "text", text: compactJson(result) }] };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "unknown_error";
            return { isError: true, content: [{ type: "text", text: compactJson({ error: message }) }] };
        }
    });
    server.setRequestHandler(ListResourcesRequestSchema, async () => ({
        resources: RESOURCE_KINDS.map((kind) => ({
            uri: resourceUri(config.defaultDomain, kind),
            name: `AuthorityPrompt ${kind}`,
            description: `Public AuthorityPrompt ${kind} resource for ${config.defaultDomain}.`,
            mimeType: kind === "instructions" ? "text/plain" : "application/json",
        })),
    }));
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        const uri = request.params.uri;
        const text = await readAuthorityPromptResource(client, uri);
        return { contents: [{ uri, mimeType: uri.endsWith("/instructions") ? "text/plain" : "application/json", text }] };
    });
    return server;
}
export async function startServer(config) {
    const server = createAuthorityPromptServer(config);
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
//# sourceMappingURL=server.js.map