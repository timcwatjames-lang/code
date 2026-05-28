import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.enrollment.create({
      data: { userId: user.id, courseId },
    })
    return NextResponse.json({ enrolled: true })
  } catch {
    return NextResponse.json({ error: 'Already enrolled' }, { status: 409 })
  }
}
