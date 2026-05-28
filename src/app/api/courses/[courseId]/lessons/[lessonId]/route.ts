import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> },
) {
  const { courseId, lessonId } = await params
  const user = await getUserFromRequest(request)

  const lesson = await prisma.lesson.findFirst({
    where: { id: lessonId, courseId },
    include: {
      ...(user ? {
        progress: {
          where: { userId: user.id },
          select: { completed: true },
        },
      } : {}),
    },
  })

  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  return NextResponse.json({
    lesson: {
      ...lesson,
      completed: user ? (lesson as any).progress?.[0]?.completed ?? false : false,
      progress: undefined,
    },
  })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> },
) {
  const { lessonId } = await params
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const completed = body.completed ?? true

  const progress = await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: { userId: user.id, lessonId },
    },
    update: { completed },
    create: { userId: user.id, lessonId, completed },
  })

  return NextResponse.json({ progress })
}
