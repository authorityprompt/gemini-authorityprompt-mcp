import { validateDomain } from "../utils/validation.js";
export async function getProvenance(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getProvenance(domain)) };
}
//# sourceMappingURL=getProvenance.js.map