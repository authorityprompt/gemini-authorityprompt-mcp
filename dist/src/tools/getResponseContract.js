import { validateDomain } from "../utils/validation.js";
export async function getResponseContract(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getResponseContract(domain)) };
}
//# sourceMappingURL=getResponseContract.js.map