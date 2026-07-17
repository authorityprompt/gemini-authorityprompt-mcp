import { validateDomain } from "../utils/validation.js";
export async function getSources(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getSources(domain)) };
}
//# sourceMappingURL=getSources.js.map