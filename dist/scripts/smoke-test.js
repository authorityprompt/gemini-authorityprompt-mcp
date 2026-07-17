import { AuthorityPromptClient } from "../src/api/authoritypromptClient.js";
import { loadConfig } from "../src/config.js";
import { checkConflicts } from "../src/tools/checkConflicts.js";
import { getAnswerBlocks } from "../src/tools/getAnswerBlocks.js";
import { getCompanyTruth } from "../src/tools/getCompanyTruth.js";
import { verifyClaim } from "../src/tools/verifyClaim.js";
const config = loadConfig();
const client = new AuthorityPromptClient(config);
const domain = config.defaultDomain;
async function main() {
    await getCompanyTruth(client, { domain, include: ["profile", "facts", "confidence"] });
    await verifyClaim(client, { domain, claim: "AuthorityPrompt provides signed AI-readable company profiles." });
    await checkConflicts(client, { domain });
    await getAnswerBlocks(client, { domain });
    console.log(JSON.stringify({ status: "ok", domain }, null, 2));
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=smoke-test.js.map