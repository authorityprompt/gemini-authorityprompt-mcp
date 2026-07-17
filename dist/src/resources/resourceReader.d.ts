import type { AuthorityPromptClient } from "../api/authoritypromptClient.js";
import { type ResourceKind } from "../schemas/responseSchemas.js";
export declare const RESOURCE_KINDS: ResourceKind[];
export declare function resourceUri(domain: string, kind: ResourceKind): string;
export declare function parseResourceUri(uri: string): {
    domain: string;
    kind: ResourceKind;
};
export declare function readAuthorityPromptResource(client: AuthorityPromptClient, uri: string): Promise<string>;
