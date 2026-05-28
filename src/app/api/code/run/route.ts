import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { execSync } from 'child_process'
import { writeFileSync, unlinkSync, mkdirSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

const TIMEOUT_MS = 10000

async function executePython(code: string): Promise<{ output: string; error: string | null }> {
  const tmpDir = join(process.cwd(), 'tmp', randomUUID())
  mkdirSync(tmpDir, { recursive: true })
  const filePath = join(tmpDir, 'script.py')
  writeFileSync(filePath, code)

  try {
    const start = performance.now()
    const output = execSync(`python "${filePath}"`, {
      timeout: TIMEOUT_MS,
      encoding: 'utf-8',
    })
    const executionTime = performance.now() - start
    return { output: output.trim(), error: null }
  } catch (err: any) {
    return { output: '', error: err.stderr?.trim() || err.message }
  } finally {
    try { unlinkSync(filePath); } catch {}
    try { unlinkSync(tmpDir); } catch {}
  }
}

async function executeJavaScript(code: string): Promise<{ output: string; error: string | null }> {
  const tmpDir = join(process.cwd(), 'tmp', randomUUID())
  mkdirSync(tmpDir, { recursive: true })
  const filePath = join(tmpDir, 'script.js')
  writeFileSync(filePath, code)

  try {
    const output = execSync(`node "${filePath}"`, {
      timeout: TIMEOUT_MS,
      encoding: 'utf-8',
    })
    return { output: output.trim(), error: null }
  } catch (err: any) {
    return { output: '', error: err.stderr?.trim() || err.message }
  } finally {
    try { unlinkSync(filePath); } catch {}
    try { unlinkSync(tmpDir); } catch {}
  }
}

function executeHtml(code: string): { output: string; error: string | null } {
  return { output: code, error: null }
}

function executeCss(code: string): { output: string; error: string | null } {
  return { output: code, error: null }
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Please sign in to run code' }, { status: 401 })
  }

  try {
    const { code, language } = await request.json()

    if (!code || !language) {
      return NextResponse.json({ error: 'Missing code or language' }, { status: 400 })
    }

    const lang = language.toUpperCase()
    let result: { output: string; error: string | null }

    switch (lang) {
      case 'PYTHON':
        result = await executePython(code)
        break
      case 'JAVASCRIPT':
        result = await executeJavaScript(code)
        break
      case 'HTML':
        result = executeHtml(code)
        break
      case 'CSS':
        result = executeCss(code)
        break
      default:
        return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })
    }

    await prisma.codeSnippet.create({
      data: {
        userId: user.id,
        language: lang,
        code,
        output: result.output,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Code execution error:', error)
    return NextResponse.json({ error: 'Execution failed' }, { status: 500 })
  }
}
