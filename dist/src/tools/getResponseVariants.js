import { validateDomain } from "../utils/validation.js";
export async function getResponseVariants(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getResponseVariants(domain)) };
}
//# sourceMappingURL=getResponseVariants.js.map