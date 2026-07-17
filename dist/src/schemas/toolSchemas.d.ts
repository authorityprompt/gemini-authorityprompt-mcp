export declare const domainInputSchema: {
    readonly type: "object";
    readonly properties: {
        readonly domain: {
            readonly type: "string";
            readonly description: "Company domain, for example authorityprompt.com";
        };
    };
    readonly required: readonly ["domain"];
};
export declare const getCompanyTruthInputSchema: {
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
export declare const getVerifiedFactsInputSchema: {
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
export declare const verifyClaimInputSchema: {
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
export declare const recommendedAnswerInputSchema: {
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
