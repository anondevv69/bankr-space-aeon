Here’s the Base MCP onboarding and authorization flow. I’ll keep it concise and follow the guidance in the skill.

Onboarding (short)
- Base MCP gives you access to a Base Account wallet with capabilities like viewing balances, sending and swapping tokens, signing messages, x402 payments, batched contract calls, and transaction history across supported chains. Plugins available in the Base repo extend functionality for DeFi, swaps, and more.

Disclaimer (verbatim)
- By using the Base MCP, you agree to the Base Account and Base App Terms of Service. Plugins available in the Base repo are authored by Base, not by the third-party protocols they reference.

Wallet display note
- Wallet address and balance are optional — only fetch/display them when you ask, or when a pending operation actually needs the address (e.g., a write call, position lookup). Don’t volunteer wallet data up front.

Authorization URL
- To proceed, please authorize the Base MCP using the following URL in your browser:

https://mcp.base.org/authorize?response_type=code&client_id=0d11de37-1bf8-46f0-b8b2-4c2ddf17ead7&code_challenge=TLtDFHOBGvjix3r5fZVmKfAWffw7GeOTXCWbiU-Hn-s&code_challenge_method=S256&redirect_uri=http%3A%2F%2Flocalhost%3A61496%2Fcallback&state=4YBrbAmiqp3LR_7gHUWYYPAC9hBoz0PkNYtph0yF_iY&scope=agent_wallet%3Atransact+agent_wallet%3Aescalate

What I’ll do after you authorize
- After you complete the flow, you’ll be redirected to a localhost URL (callback) that contains a code. Please paste the full URL from your browser address bar back here (the redirect URL). I will then call mcp__base__complete_authentication with that URL to finish the setup.

If you hit a redirect error
- If the browser shows a connection error on the redirect page, paste the full URL from the address bar here and I’ll handle the rest.

Next steps after completion
- Once authentication succeeds, Base MCP tools will be callable in this chat. I can then fetch balances, send transactions, sign messages, run batched contract calls, or use partner plugins as needed.

Status
- Awaiting the callback URL after you complete the authorization flow. If you prefer, I can guide you through a quick test command to verify a basic read (e.g., balance) once authenticated.

Would you like me to proceed to wait for your callback URL, or would you like a quick test script to run after you paste it?
