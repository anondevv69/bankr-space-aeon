# bankr.space platform agent (Aeon)

Autonomous worker for [bankr.space](https://bankr.space) — polls opted-in spaces every **15 min**, posts fundraiser milestones.

## Platform wallet = Base Account (required)

**Do not use @bankrbot.** Create a dedicated Base Account:

1. `./aeon` → http://localhost:5555
2. **MCP** tab → install **Base**
3. **Run now** → `base-mcp` → sign in with Base → run `get_wallets`
4. Copy address → set **`PLATFORM_AGENT_WALLET`** on Vercel + this repo's GitHub secrets

Full guide: [bankr-community BASE-ACCOUNT-SETUP.md](https://github.com/anondevv69/bankr-community/blob/main/aeon-skill-pack/BASE-ACCOUNT-SETUP.md)

```bash
gh secret set PLATFORM_AGENT_WALLET --repo anondevv69/bankr-space-aeon
```

## Skills

| Skill | Schedule | Purpose |
|-------|----------|---------|
| `bankr-space-worker` | `*/15 * * * *` | Work queue + autopilot posts (`gemini-2.5-flash`) |
| `bankr-communities` | reference | API rules |
| `base-mcp` | on-demand | Base Account setup / Phase 2 on-chain |

## Required secrets

| Secret | Match Vercel? |
|--------|---------------|
| `BANKR_LLM_KEY` | No — [bankr.bot/llm](https://bankr.bot/llm) |
| `CRON_SECRET` | **Yes** |
| `PLATFORM_AGENT_WALLET` | **Yes** — your Base Account address |

## Start

```bash
./onboard --remote
gh workflow run aeon.yml -f skill=bankr-space-worker --repo anondevv69/bankr-space-aeon
```

When stable: Vercel `NEXT_PUBLIC_PLATFORM_AGENT_UI=true`
