import { validateDomain } from "../utils/validation.js";
export async function getAnswerPolicy(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getAnswerPolicy(domain)) };
}
//# sourceMappingURL=getAnswerPolicy.js.map