import { RESOURCE_PATHS } from "../schemas/responseSchemas.js";
import { validateDomain } from "../utils/validation.js";
export const RESOURCE_KINDS = Object.keys(RESOURCE_PATHS);
export function resourceUri(domain, kind) {
    return `authorityprompt://company/${validateDomain(domain)}/${kind}`;
}
export function parseResourceUri(uri) {
    const match = uri.match(/^authorityprompt:\/\/company\/([^/]+)\/([^/]+)$/);
    if (!match)
        throw new Error("invalid AuthorityPrompt resource URI");
    const domain = validateDomain(match[1]);
    const kind = match[2];
    if (!RESOURCE_KINDS.includes(kind))
        throw new Error("unknown AuthorityPrompt resource kind");
    return { domain, kind };
}
export async function readAuthorityPromptResource(client, uri) {
    const { domain, kind } = parseResourceUri(uri);
    if (kind === "instructions")
        return client.getInstructions(domain);
    const path = RESOURCE_PATHS[kind];
    return JSON.stringify(await client.getJson(domain, path, kind), null, 2);
}
//# sourceMappingURL=resourceReader.js.map