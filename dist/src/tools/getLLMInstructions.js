import { validateDomain } from "../utils/validation.js";
export async function getLLMInstructions(client, input) {
    const domain = validateDomain(input.domain);
    return { domain, instructions: await client.getInstructions(domain) };
}
//# sourceMappingURL=getLLMInstructions.js.map