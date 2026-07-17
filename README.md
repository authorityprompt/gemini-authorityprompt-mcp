# AuthorityPrompt for Gemini CLI

Companies have an official website for humans. They don't have an official
identity for AI. [AuthorityPrompt](https://authorityprompt.com) is that identity
— and this extension lets you manage **your own company's** identity from Gemini
CLI.

You sign in with your AuthorityPrompt account. Gemini then works with your
company's data: verified facts, sources, AIO readiness, LLM visibility. Each
account sees only its own companies.

## Install

```bash
gemini extensions install https://github.com/authorityprompt/gemini-authorityprompt-mcp
```

On first install Gemini CLI asks whether to trust the current workspace — answer
`Y`. The first time a tool runs, your browser opens the AuthorityPrompt consent
screen. After you approve, the token is managed by Gemini CLI; nothing is stored
in this repository.

You need an AuthorityPrompt account: https://authorityprompt.com

## Use

Ask in plain language:

```
Which account am I connected as?
List my companies.
Run an AIO readiness audit.
Add https://example.com/about as a source for my company.
What do LLMs currently say about us, and where does it disagree with our facts?
```

## What it can do

Read your account and companies, pull the canonical profile, verified facts,
sources with provenance and confidence, run AIO readiness audits and LLM
visibility checks, and — with your consent — publish and repair company facts.

Writes are explicit: the tools that change data are separate from the ones that
read it, and the OAuth scopes you grant decide which are available.

## Permissions

The extension requests only what it needs:

| Scope | Purpose |
|---|---|
| `profile:read` | identify the connected account |
| `companies:read` | list your companies |
| `company_profile:read` | read canonical profile, facts, sources |
| `company_profile:write` | publish or repair facts, add sources |
| `reports:read` | read audit and visibility reports |
| `aio:run` | run AIO readiness audits |
| `generators:run` | generate llms.txt, JSON-LD, answer blocks |
| `visibility:check` | check what LLMs say about the company |

Revoke access any time from your AuthorityPrompt account settings.

## How it works

This extension is a thin manifest. It points Gemini CLI at the AuthorityPrompt
MCP endpoint:

```
https://authorityprompt.com/api/v1/integrations/gemini/mcp
```

There is no local server and no dependencies to install. The endpoint requires
OAuth 2.0; Gemini CLI discovers the authorization server from the `401`
response, registers itself dynamically (RFC 7591) and runs the flow with PKCE.

## Links

- Website: https://authorityprompt.com
- Privacy: https://authorityprompt.com/privacy
- Terms: https://authorityprompt.com/terms
- Support: support@authorityprompt.com

## License

MIT — see [LICENSE](LICENSE).
