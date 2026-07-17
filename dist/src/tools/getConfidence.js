import { validateDomain } from "../utils/validation.js";
export async function getConfidence(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getConfidence(domain)) };
}
//# sourceMappingURL=getConfidence.js.map