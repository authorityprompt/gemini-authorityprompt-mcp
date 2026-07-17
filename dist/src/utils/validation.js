const DOMAIN_RE = /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;
export function validateDomain(value) {
    const domain = String(value || "").trim().toLowerCase();
    if (!domain || domain.includes("://") || domain.includes("/") || /[<>'"`\s]/.test(domain)) {
        throw new Error("domain must be a bare domain, for example authorityprompt.com");
    }
    if (!DOMAIN_RE.test(domain)) {
        throw new Error("domain is not valid");
    }
    return domain;
}
export function optionalFactType(value) {
    if (value == null || value === "")
        return undefined;
    const factType = String(value).trim().toLowerCase();
    if (!/^[a-z0-9_-]{1,64}$/.test(factType)) {
        throw new Error("fact_type must contain only letters, numbers, underscores, or hyphens");
    }
    return factType;
}
export function validateClaim(value) {
    const claim = String(value || "").trim();
    if (!claim || claim.length > 2000) {
        throw new Error("claim must be a non-empty string under 2000 characters");
    }
    return claim;
}
//# sourceMappingURL=validation.js.map