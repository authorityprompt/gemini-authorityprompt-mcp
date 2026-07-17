# Architecture

AuthorityPrompt MCP is a stdio MCP server for AI clients. It does not store company truth. It fetches public canonical AuthorityPrompt endpoints and exposes them as MCP resources and tools.

AI client -> MCP stdio -> authorityprompt-mcp -> AuthorityPrompt canonical endpoints -> verified company truth.
