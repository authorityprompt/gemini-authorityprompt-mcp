import { validateDomain } from "../utils/validation.js";
export async function getResponseQuality(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getResponseQuality(domain)) };
}
//# sourceMappingURL=getResponseQuality.js.map