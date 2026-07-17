# Tools

The server exposes truth-focused tools: get_company_truth, get_verified_facts, get_sources, check_conflicts, verify_claim, get_confidence, get_provenance, get_answer_blocks, and get_llm_instructions.

`verify_claim` delegates to hosted `POST /mcp/call` so backend verification remains canonical.

## Response Layer Tools

P2 adds response orchestration tools: `get_response_contract`, `get_response_schema`, `get_answer_policy`, `get_response_variants`, `get_response_quality`, and `generate_recommended_answer`.

Use these tools when an AI agent needs to turn verified company truth into a stable, structured, conflict-aware answer. `generate_recommended_answer` returns deterministic sections and evidence references, not final prose.
