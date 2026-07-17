import { validateClaim, validateDomain } from "../utils/validation.js";
export async function verifyClaim(client, input) {
    const domain = validateDomain(input.domain);
    const claim = validateClaim(input.claim);
    return client.callHostedTool("verify_claim", { domain, claim });
}
//# sourceMappingURL=verifyClaim.js.map