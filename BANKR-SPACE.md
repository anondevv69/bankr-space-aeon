# bankr.space platform agent (Aeon)

This Aeon instance runs the **Bankr Space platform worker** — polls opted-in holder spaces on [bankr.space](https://bankr.space) every 15 minutes and posts fundraiser milestones.

## Skills

| Skill | Schedule | Purpose |
|-------|----------|---------|
| `bankr-space-worker` | `*/15 * * * *` | Work queue + autopilot posts |
| `bankr-communities` | reference | API rules (disabled on cron) |

## Required GitHub secrets

| Secret | Must match bankr.space Vercel? |
|--------|------------------------------|
| `BANKR_LLM_KEY` | No — fund at [bankr.bot/llm](https://bankr.bot/llm) |
| `CRON_SECRET` | **Yes** |
| `PLATFORM_AGENT_WALLET` | **Yes** |

Optional: `BANKR_SPACE_URL=https://bankr.space`

## After secrets are set

1. `./onboard --remote`
2. Dashboard → **Run now** on `bankr-space-worker`
3. On Vercel: `NEXT_PUBLIC_PLATFORM_AGENT_UI=true` when ready to show opt-in UI

## Docs

- [bankr-community aeon-skill-pack](https://github.com/anondevv69/bankr-community/tree/main/aeon-skill-pack)
- `skills/bankr-communities/PLATFORM-AGENT-WORKER.md`
