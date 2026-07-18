# AGENTS.md — ReactChullin Project Instructions

## Commit Preference

- After completing a clear, reviewable task that changed code or documentation, automatically create a git commit unless the user explicitly says not to commit.
- Do not commit after exploration-only work, file inspection, test runs, debugging probes, or temporary experiments that are not intended as the final task result.
- Use Conventional Commits, for example `feat(memory): add memory center`.
- Stage only files that belong to the current task. Do not stage unrelated user changes.
- Run the relevant verification before committing when practical. If verification fails, report the failure and do not commit unless the user explicitly asks to commit anyway.
- Prefer one logical commit per completed task, not one commit per small edit.
- Do not automatically push. Push only when the user asks.
- Never commit secrets, private keys, `.env` files, credentials, or generated build cache files.

## Deletion Safety

- Never permanently delete project files or user files directly.
- If something must be removed, move it to the operating system Trash first so it can be recovered.
- Avoid destructive cleanup commands. Do not use direct deletion commands such as `rm`, `rm -rf`, or equivalent permanent removal unless the user explicitly overrides this rule for that exact action.
