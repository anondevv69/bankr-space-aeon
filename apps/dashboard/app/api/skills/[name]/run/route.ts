import { NextResponse } from 'next/server'
import { execFileSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parseConfig } from '@/lib/config'

const REPO_ROOT = resolve(process.cwd(), '..', '..')

// Must stay in sync with .github/workflows/aeon.yml workflow_dispatch model options.
const WORKFLOW_MODELS = new Set([
  '(config default)',
  'claude-opus-4-8',
  'claude-fable-5',
  'claude-sonnet-4-6',
  'claude-haiku-4-5-20251001',
  'gemini-3-pro',
  'gemini-3-flash',
  'gemini-2.5-flash',
  'gpt-5.2',
  'gpt-5-nano',
  'kimi-k2.5',
  'qwen3-coder',
])

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  try {
    const { name } = await params

    // Validate skill name to prevent injection
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      return NextResponse.json({ error: 'Invalid skill name' }, { status: 400 })
    }

    // Read optional var and model from request body
    let skillVar = ''
    let model = ''
    try {
      const body = await request.json() as { var?: string; model?: string }
      if (body.var && typeof body.var === 'string') {
        skillVar = body.var.replace(/[^a-zA-Z0-9_ .\-/#@]/g, '')
      }
      if (body.model && typeof body.model === 'string') {
        model = body.model.replace(/[^a-zA-Z0-9_\-]/g, '')
      }
    } catch { /* no body is fine */ }

    const args = ['workflow', 'run', 'aeon.yml', '-f', `skill=${name}`]
    if (skillVar) args.push('-f', `var=${skillVar}`)
    if (model) {
      let dispatchModel = model
      try {
        const config = parseConfig(readFileSync(resolve(REPO_ROOT, 'aeon.yml'), 'utf8'))
        const skillModel = config.skills[name]?.model
        // Per-skill models in aeon.yml are resolved by the workflow when using config default.
        if (skillModel && model === skillModel) {
          dispatchModel = '(config default)'
        }
      } catch { /* aeon.yml unreadable — fall through with raw model */ }
      if (WORKFLOW_MODELS.has(dispatchModel)) {
        args.push('-f', `model=${dispatchModel}`)
      }
    }

    execFileSync('gh', args, { stdio: 'pipe', cwd: REPO_ROOT })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to trigger run'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
