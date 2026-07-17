import { validateDomain } from "../utils/validation.js";
export async function checkConflicts(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getConflicts(domain)) };
}
//# sourceMappingURL=checkConflicts.js.map