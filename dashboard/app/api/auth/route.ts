import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

function ghAvailable(): boolean {
  try {
    execSync('gh auth status', { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

export async function GET() {
  // Check if ANTHROPIC_API_KEY or CLAUDE_CODE_OAUTH_TOKEN is set
  try {
    if (!ghAvailable()) {
      return NextResponse.json({ authenticated: false, error: 'gh CLI not authenticated' })
    }
    const out = execSync('gh secret list --json name -q ".[].name"', {
      stdio: 'pipe',
    }).toString().trim()
    const secrets = out ? out.split('\n').filter(Boolean) : []
    const hasApiKey = secrets.includes('ANTHROPIC_API_KEY')
    const hasOauth = secrets.includes('CLAUDE_CODE_OAUTH_TOKEN')
    return NextResponse.json({ authenticated: hasApiKey || hasOauth, hasApiKey, hasOauth })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

export async function POST() {
  // Run claude setup-token, capture the token, save as GitHub secret
  try {
    if (!ghAvailable()) {
      return NextResponse.json({ error: 'gh CLI not authenticated. Run: gh auth login' }, { status: 503 })
    }

    // claude setup-token outputs the token to stdout
    const token = execSync('claude setup-token', {
      stdio: 'pipe',
      timeout: 60000,
    }).toString().trim()

    if (!token) {
      return NextResponse.json({ error: 'No token returned from claude setup-token' }, { status: 500 })
    }

    // Save as CLAUDE_CODE_OAUTH_TOKEN GitHub secret
    execSync(`gh secret set CLAUDE_CODE_OAUTH_TOKEN`, {
      input: token,
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to setup token'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
