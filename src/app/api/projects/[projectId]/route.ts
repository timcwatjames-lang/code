import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await params
  const user = await getUserFromRequest(request)

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project || !project.published) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  if (user?.tier === 'FREE') {
    const { code, files, ...rest } = project
    return NextResponse.json({
      project: { ...rest, code: null, files: null, locked: true },
    })
  }

  return NextResponse.json({ project })
}
