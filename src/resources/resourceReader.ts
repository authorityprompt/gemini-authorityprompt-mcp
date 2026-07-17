import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { RESOURCE_PATHS, type ResourceKind } from "../schemas/responseSchemas.js";
import { validateDomain } from "../utils/validation.js";

export const RESOURCE_KINDS = Object.keys(RESOURCE_PATHS) as ResourceKind[];

export function resourceUri(domain: string, kind: ResourceKind): string {
  return `authorityprompt://company/${validateDomain(domain)}/${kind}`;
}

export function parseResourceUri(uri: string): { domain: string; kind: ResourceKind } {
  const match = uri.match(/^authorityprompt:\/\/company\/([^/]+)\/([^/]+)$/);
  if (!match) throw new Error("invalid AuthorityPrompt resource URI");
  const domain = validateDomain(match[1]);
  const kind = match[2] as ResourceKind;
  if (!RESOURCE_KINDS.includes(kind)) throw new Error("unknown AuthorityPrompt resource kind");
  return { domain, kind };
}

export async function readAuthorityPromptResource(client: AuthorityPromptClient, uri: string): Promise<string> {
  const { domain, kind } = parseResourceUri(uri);
  if (kind === "instructions") return client.getInstructions(domain);
  const path = RESOURCE_PATHS[kind];
  return JSON.stringify(await client.getJson(domain, path, kind), null, 2);
}
