# AGENTS.md — ReactChullin Project Instructions

## Commit Preference

- After completing code or documentation changes for this project, automatically create a git commit unless the user explicitly says not to commit.
- Use Conventional Commits, for example `feat(memory): add memory center`.
- Stage only files that belong to the current task. Do not stage unrelated user changes.
- Run the relevant verification before committing when practical. If verification fails, report the failure and do not commit unless the user explicitly asks to commit anyway.
- Do not automatically push. Push only when the user asks.
- Never commit secrets, private keys, `.env` files, credentials, or generated build cache files.
