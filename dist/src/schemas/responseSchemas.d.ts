export declare const RESOURCE_PATHS: {
    readonly profile: "manifest.json";
    readonly facts: "facts.json";
    readonly sources: "sources.json";
    readonly conflicts: "conflicts.json";
    readonly confidence: "confidence.json";
    readonly provenance: "provenance.json";
    readonly "answer-blocks": "answer-blocks.json";
    readonly instructions: "llm-instructions.txt";
    readonly "response-contract": "response-contract.json";
    readonly "response-schema": "response-schema.json";
    readonly "answer-policy": "answer-policy.json";
    readonly "response-priorities": "response-priorities.json";
    readonly "response-variants": "response-variants.json";
    readonly "response-quality": "response-quality.json";
};
export type ResourceKind = keyof typeof RESOURCE_PATHS;
