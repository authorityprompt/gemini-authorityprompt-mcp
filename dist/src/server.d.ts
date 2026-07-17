import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import type { AuthorityPromptConfig } from "./config.js";
export declare const TOOL_DEFINITIONS: readonly [{
    readonly name: "get_company_truth";
    readonly description: "Returns the complete verified company truth package.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
            };
            readonly include: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "Optional list of resources to include.";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_verified_facts";
    readonly description: "Returns verified facts about the company.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
            };
            readonly fact_type: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_sources";
    readonly description: "Returns the source hierarchy for a company profile.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "check_conflicts";
    readonly description: "Returns known conflicts for this company profile.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "verify_claim";
    readonly description: "Checks whether a claim is supported by AuthorityPrompt data.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
            };
            readonly claim: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["domain", "claim"];
    };
}, {
    readonly name: "get_confidence";
    readonly description: "Returns confidence signals for the company profile.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_provenance";
    readonly description: "Returns the provenance graph for verified company truth.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_answer_blocks";
    readonly description: "Returns response-ready AI answer blocks.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_llm_instructions";
    readonly description: "Returns instructions for how AI systems should answer.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_response_contract";
    readonly description: "Returns the response contract for stable company answers.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_response_schema";
    readonly description: "Returns the short, standard and long answer schemas.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_answer_policy";
    readonly description: "Returns answer behavior policy for verified, conflict-aware answers.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_response_variants";
    readonly description: "Returns intent-specific response variants.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "get_response_quality";
    readonly description: "Returns response readiness score and recommendations.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
                readonly description: "Company domain, for example authorityprompt.com";
            };
        };
        readonly required: readonly ["domain"];
    };
}, {
    readonly name: "generate_recommended_answer";
    readonly description: "Returns deterministic recommended answer structure for a selected intent.";
    readonly inputSchema: {
        readonly type: "object";
        readonly properties: {
            readonly domain: {
                readonly type: "string";
            };
            readonly intent: {
                readonly type: "string";
                readonly description: "Response intent, for example vendor_evaluation.";
            };
            readonly max_words: {
                readonly type: "integer";
                readonly description: "Maximum words for the deterministic recommended answer structure.";
            };
        };
        readonly required: readonly ["domain"];
    };
}];
export declare function createAuthorityPromptServer(config: AuthorityPromptConfig): Server;
export declare function startServer(config: AuthorityPromptConfig): Promise<void>;
