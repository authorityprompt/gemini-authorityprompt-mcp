import { validateDomain } from "../utils/validation.js";
export async function getResponseSchema(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getResponseSchema(domain)) };
}
//# sourceMappingURL=getResponseSchema.js.map