# AuthorityPrompt for Gemini CLI

Verified company truth as MCP tools and resources — canonical facts, sources,
provenance and confidence, published by the company itself through
[AuthorityPrompt](https://authorityprompt.com).

Companies have an official website for humans. They don't have an official
identity for AI. AuthorityPrompt is that identity — this extension lets Gemini
read it.

## Install

```bash
gemini extensions install https://github.com/authorityprompt/gemini-authorityprompt-mcp
```

Then ask Gemini about any AuthorityPrompt-powered company:

```
What verified facts does AuthorityPrompt have for authorityprompt.com?
```

## Configuration

The extension reads **public** company profiles and needs no account. Optional
settings (environment variables or CLI flags):

| Setting | Env | Flag | Default |
|---|---|---|---|
| API base URL | `AUTHORITYPROMPT_API_URL` | `--api-url` | `https://authorityprompt.com` |
| Default company domain | `AUTHORITYPROMPT_DEFAULT_DOMAIN` | `--domain` | `authorityprompt.com` |
| Log level | `AUTHORITYPROMPT_LOG_LEVEL` | `--log-level` | `info` |

## Example prompts

1. "What verified facts does AuthorityPrompt have for acme.com?"
2. "Check this claim about acme.com against their canonical record."
3. "Show the sources and provenance behind acme.com's pricing facts."
4. "How confident is acme.com's verified profile, and where are the gaps?"
5. "Generate a recommended answer about acme.com using only verified facts."

## What it can and cannot do

- **Can:** read public verified facts, sources, provenance, confidence,
  answer blocks and response contracts for any company published on
  AuthorityPrompt.
- **Cannot:** read private dashboard data or change anything. This extension is
  strictly read-only over public data.

For full account management (drafting fact updates, running AIO audits,
generators, reports) use the remote connector — see
<https://authorityprompt.com/integrations/gemini>.

## Links

- Homepage: <https://authorityprompt.com>
- Install guide: <https://authorityprompt.com/integrations/gemini>
- Privacy policy: <https://authorityprompt.com/legal/privacy-policy>
- Terms: <https://authorityprompt.com/legal/terms-conditions>
- Support: hello@authorityprompt.com

## Development

```bash
npm install
npm run build      # emits dist/src/index.js referenced by gemini-extension.json
npm test
npm run typecheck
```

MIT © AuthorityPrompt
