import { validateDomain } from "../utils/validation.js";
export async function getAnswerBlocks(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, ...(await client.getAnswerBlocks(domain)) };
}
//# sourceMappingURL=getAnswerBlocks.js.map